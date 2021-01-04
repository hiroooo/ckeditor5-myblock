// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertMyBlockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createMyBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'myBlock' );

        this.isEnabled = allowedIn !== null;
    }
}

function createMyBlock( writer ) {
    const myBlock = writer.createElement( 'myBlock' );
    const myBlockTitle = writer.createElement( 'myBlockTitle' );
    const myBlockDescription = writer.createElement( 'myBlockDescription' );

    writer.append( myBlockTitle, myBlock );
    writer.append( myBlockDescription, myBlock);

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', myBlockDescription );

    return myBlock;
}
