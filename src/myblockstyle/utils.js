import fullWidthIcon from '@ckeditor/ckeditor5-core/theme/icons/object-full-width.svg';
import leftIcon from '@ckeditor/ckeditor5-core/theme/icons/object-left.svg';
import centerIcon from '@ckeditor/ckeditor5-core/theme/icons/object-center.svg';
import rightIcon from '@ckeditor/ckeditor5-core/theme/icons/object-right.svg';
import { logWarning } from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

const defaultStyles = {
	waku: {
		name: 'waku',
		title: '枠（見出しあり）',
		className: 'waku',
	},
	waku2: {
		name: 'waku2',
		title: '枠（見出し無し）',
		className: 'waku2',
	},
	kokuban: {
		name: 'kokuban',
		title: '黒板',
		className: 'kokuban'
	},
};

const defaultIcons = {
};

/**
 * Returns a {@link module:image/image~ImageConfig#styles} array with items normalized in the
 * {@link module:image/imagestyle/imagestyleediting~ImageStyleFormat} format and a complete `icon` markup for each style.
 *
 * @returns {Array.<module:image/imagestyle/imagestyleediting~ImageStyleFormat>}
 */
export function normalizeImageStyles( configuredStyles = [] ) {
	return configuredStyles.map( _normalizeStyle );
}

function _normalizeStyle( style ) {
	// Just the name of the style has been passed.
	if ( typeof style == 'string' ) {
		const styleName = style;

		// If it's one of the defaults, just use it.
		if ( defaultStyles[ styleName ] ) {
			// Clone the style to avoid overriding defaults.
			style = Object.assign( {}, defaultStyles[ styleName ] );
		}
		// If it's just a name but none of the defaults, warn because probably it's a mistake.
		else {
			/**
			 * There is no such image style of given name.
			 *
			 * @error image-style-not-found
			 * @param {String} name Name of a missing style name.
			 */
			logWarning( 'image-style-not-found', { name: styleName } );

			// Normalize the style anyway to prevent errors.
			style = {
				name: styleName
			};
		}
	}
	// If an object style has been passed and if the name matches one of the defaults,
	// extend it with defaults – the user wants to customize a default style.
	// Note: Don't override the user–defined style object, clone it instead.
	else if ( defaultStyles[ style.name ] ) {
		const defaultStyle = defaultStyles[ style.name ];
		const extendedStyle = Object.assign( {}, style );

		for ( const prop in defaultStyle ) {
			if ( !Object.prototype.hasOwnProperty.call( style, prop ) ) {
				extendedStyle[ prop ] = defaultStyle[ prop ];
			}
		}

		style = extendedStyle;
	}

	// If an icon is defined as a string and correspond with a name
	// in default icons, use the default icon provided by the plugin.
	if ( typeof style.icon == 'string' && defaultIcons[ style.icon ] ) {
		style.icon = defaultIcons[ style.icon ];
	}

	return style;
}
