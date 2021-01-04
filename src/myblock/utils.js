import { findOptimalInsertionPosition, isWidget, toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export function toMyBlockWidget( viewElement, writer, label ) {
	writer.setCustomProperty( 'myBlock', true, viewElement );

	return toWidget( viewElement, writer, { } );
}

export function isMyBlockWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'myBlock' ) && isWidget( viewElement );
}

export function getSelectedMyBlockWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement && isMyBlockWidget( viewElement ) ) {
		return viewElement;
	}

	return null;
}
