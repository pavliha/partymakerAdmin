import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { func, object, bool, string, oneOfType } from 'prop-types'
import { FormControl, FormHelperText, FormLabel, withStyles } from '@material-ui/core'

const styles = {
  label: {
    paddingBottom: 16,
  },
}

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
    const { classes, label, error, helperText } = this.props
    const { editorState } = this.state

    return (
      <FormControl>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}

TextEditor.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  label: string,
  error: bool,
  helperText: oneOfType([string, bool]),
}

TextEditor.defaultProps = {
  label: null,
  error: false,
  helperText: null,
}

export default withStyles(styles)(TextEditor)
