import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';


import { normalizeImageStyles } from './utils';

// css
import '../../theme/myblockstyle.css';

export default class MyBlockStyleUI extends Plugin {
	static get pluginName() {
		return 'MyBlockStyleUI';
	}

	get localizedDefaultStylesTitles() {
		const t = this.editor.t;

		return {
			'Side image': t( 'Side image' ),
			'Left aligned image': t( 'Left aligned image' ),
			'Centered image': t( 'Centered image' ),
			'Right aligned image': t( 'Right aligned image' )
		};
	}

	init() {
		const editor = this.editor;
		const configuredStyles = editor.config.get( 'myBlock.styles' );

		const translatedStyles = translateStyles( normalizeImageStyles( configuredStyles ), this.localizedDefaultStylesTitles );

		for ( const style of translatedStyles ) {
			this._createButton( style );
		}
	}

	_createButton( style ) {
		const editor = this.editor;

		const componentName = `myBlockStyle:${ style.name }`;

		editor.ui.componentFactory.add( componentName, locale => {
			const command = editor.commands.get( 'myBlockStyle' );
			const view = new ButtonView( locale );

			view.set( {
				label: style.title,
				tooltip: true,
				withText: true,
				isToggleable: true
			} );

			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			view.bind( 'isOn' ).to( command, 'value', value => value === style.name );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'myBlockStyle', { value: style.name } );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}

function translateStyles( styles, titles ) {
	for ( const style of styles ) {
		if ( titles[ style.title ] ) {
			style.title = titles[ style.title ];
		}
	}

	return styles;
}
