import Command from '@ckeditor/ckeditor5-core/src/command';

function isMyBlock( modelElement ) {
	return !!modelElement && modelElement.is( 'element', 'myBlock' );
}

export default class MyBlockStyleCommand extends Command {
	constructor( editor, styles ) {
		super( editor );

		this.defaultStyle = false;

		this.styles = styles.reduce( ( styles, style ) => {
			styles[ style.name ] = style;

			if ( style.isDefault ) {
				this.defaultStyle = style.name;
			}

			return styles;
		}, {} );
	}

	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = isMyBlock( element );

		if ( !element ) {
			this.value = false;
		} else if ( element.hasAttribute( 'myBlockStyle' ) ) {
			const attributeValue = element.getAttribute( 'myBlockStyle' );
			this.value = this.styles[ attributeValue ] ? attributeValue : false;
		} else {
			this.value = this.defaultStyle;
		}
	}

	execute( options ) {
		const styleName = options.value;

		const model = this.editor.model;
		const myBlockElement = model.document.selection.getSelectedElement();

		model.change( writer => {
			if ( this.styles[ styleName ].isDefault ) {
				writer.removeAttribute( 'myBlockStyle', myBlockElement );
			} else {
				writer.setAttribute( 'myBlockStyle', styleName, myBlockElement );
			}
		} );
	}
}
