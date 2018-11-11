import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { func, string } from 'prop-types'

class TextEditor extends Component {

  constructor(props) {
    super(props)
    const { value } = props
    this.state = {
      editorState: value
        ? EditorState.createWithContent(stateFromHTML(value))
        : EditorState.createEmpty(),
    }
  }

  onEditorStateChange = (editorState) => {
    const { name, onChange } = this.props
    this.setState({ editorState })
    const html = stateToHTML(editorState.getCurrentContent())
    onChange(name, html)
  }

  render() {
    const { editorState } = this.state

    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}

TextEditor.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
}

TextEditor.defaultProps = {}

export default TextEditor
