import MyBlockEditing from './myblock/myblockediting';
import MyBlockUI from './myblock/myblockui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class MyBlock extends Plugin {
    static get requires() {
        return [ MyBlockEditing, MyBlockUI ];
    }
}
