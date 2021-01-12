// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import MyBlock from './src/myblock';
import MyBlockToolbar from './src/myblocktoolbar';
import MyBlockStyle from './src/myblockstyle';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, MyBlock, MyBlockStyle, MyBlockToolbar ],
        toolbar: [ 
          'heading', 
          'bold', 
          'italic', 
          'numberedList', 
          'bulletedList', 
          'myblock', 
        ],
        myBlock: {
          toolbar: [ 
            'myBlockStyle:waku',
            'myBlockStyle:kokuban',
            'myBlockStyle:awasete',
          ],
          styles: [
            'waku',
            'kokuban',
            'awasete'
          ]
        }
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );

        CKEditorInspector.attach( 'editor', editor );

        // Expose for playing in the console.
        window.editor = editor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );
