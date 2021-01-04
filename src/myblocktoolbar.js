import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getSelectedMyBlockWidget } from './myBlock/utils';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';

export default class MyBlockToolbar extends Plugin {
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	static get pluginName() {
		return 'MyBlockToolbar';
	}

	afterInit() {
		const editor = this.editor;
		const t = editor.t;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

		widgetToolbarRepository.register( 'myBlock', {
			ariaLabel: t( 'MyBlock toolbar' ),
			items: editor.config.get( 'myBlock.toolbar' ) || [],
			getRelatedElement: getSelectedMyBlockWidget
		} );
	}
}
