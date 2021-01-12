import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertMyBlockCommand from './insertmyblockcommand';

import { toMyBlockWidget } from './utils';

export default class MyBlockEditing extends Plugin {

    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        this._defineSchema();                                                  // ADDED
        this._defineConverters();                                              // ADDED
        this.editor.commands.add( 'insertMyBlock', new InsertMyBlockCommand( this.editor ) );
    }

    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'myBlock', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'myBlockTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'myBlock',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'myBlockDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'myBlock',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'myBlockDescription' ) && childDefinition.name == 'myBlock' ) {
                return false;
            }
        } );

    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        // <myBlock> converters
        // これをimageのようにsectionを逆変換できるようにしたほうがいい @see https://github.com/ckeditor/ckeditor5-image/blob/master/src/image/imageediting.js
        conversion.for( 'upcast' ).elementToElement( {
            model: 'myBlock',
            view: {
                name: 'section',
                classes: 'myblock'
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'myBlock',
            view: {
                name: 'section',
                classes: 'myblock'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'myBlock',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'myblock' } );

                return toMyBlockWidget( section, viewWriter, { label: 'myblock widget' } );
            }
        } );

        // title
        conversion.for( 'upcast' ).elementToElement( {
            model: 'myBlockTitle',
            view: {
                name: 'h1',
                classes: 'myblock-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'myBlockTitle',
            view: {
                name: 'h1',
                classes: 'myblock-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'myBlockTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'h1', { class: 'myblock-title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'myBlockDescription',
            view: {
                name: 'div',
                classes: 'myblock-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'myBlockDescription',
            view: {
                name: 'div',
                classes: 'myblock-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'myBlockDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'myblock-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

    }
}
