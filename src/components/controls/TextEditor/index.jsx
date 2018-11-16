import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { func, object, bool, string, oneOfType } from 'prop-types'
import { FormControl, FormHelperText, FormLabel, withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'inline-block',
    borderRadius: '8%',
  },
  border: {
    overflow: 'hidden',
    background: theme.palette.secondary.light,
    padding: 3,
    borderRadius: 8,
  },
  input: {
    paddingTop: 10,
    display: 'block',
    background: 'white',
    borderRadius: 8,
  },
  label: {
    paddingBottom: 16,
  },
})

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
      <FormControl className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <div className={classes.border}>
          <div className={classes.input}>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </div>
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
