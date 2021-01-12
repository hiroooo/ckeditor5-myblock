import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MyBlockStyleCommand from './myblockstylecommand';
import { viewToModelStyleAttribute, modelToViewStyleAttribute } from './converters';
import { normalizeImageStyles } from './utils';

export default class MyBlockStyleEditing extends Plugin {
	static get pluginName() {
		return 'MyBlockStyleEditing';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const data = editor.data;
		const editing = editor.editing;

		editor.config.define( 'myBlock.styles', [ 'waku', 'kokuban', 'awasete' ] );

		const styles = normalizeImageStyles( editor.config.get( 'myBlock.styles' ) );

		schema.extend( 'myBlock', { allowAttributes: 'myBlockStyle' } );

		// Converters for imageStyle attribute from model to view.
		const modelToViewConverter = modelToViewStyleAttribute( styles );
		editing.downcastDispatcher.on( 'attribute:myBlockStyle:myBlock', modelToViewConverter );
		data.downcastDispatcher.on( 'attribute:myBlockStyle:myBlock', modelToViewConverter );

		// Converter for figure element from view to model.
		data.upcastDispatcher.on( 'element:section', viewToModelStyleAttribute( styles ), { priority: 'low' } );

		// Register imageStyle command.
		editor.commands.add( 'myBlockStyle', new MyBlockStyleCommand( editor, styles ) );
	}
}
