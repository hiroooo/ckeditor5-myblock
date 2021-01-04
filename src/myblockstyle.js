import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MyBlockStyleEditing from './myblockstyle/myblockstyleediting';
import MyBlockStyleUI from './myblockstyle/myblockstyleui';

export default class ImageStyle extends Plugin {
	static get requires() {
		return [ MyBlockStyleEditing, MyBlockStyleUI ];
	}

	static get pluginName() {
		return 'MyBlockStyle';
	}
}
