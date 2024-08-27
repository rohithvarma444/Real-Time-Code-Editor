import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    const editorRef = useRef(null); // Create a ref to track the editor instance

    useEffect(() => {
        if (editorRef.current === null) {
            editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });
        }
    }, []);

    return (
        <div className="editorWrap">
            <textarea id="realtimeEditor" style={{ width: '100%', height: '100%' }}></textarea>
        </div>
    );
}

export default Editor;
