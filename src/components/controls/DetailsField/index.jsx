import React, { Component } from 'react'
import { func, object, bool, string, oneOfType } from 'prop-types'
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  withStyles,
} from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'

const styles = {
  root: {
    paddingTop: 24,
  },
  label: {},
  field: {},
  fieldLabel: {},
  fieldValue: {},
  labelTd: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  valueTd: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}

class DetailsField extends Component {

  add = () => {
    const { name, value, onChange } = this.props
    onChange(name, [
      ...value,
      { label: this.label, value: this.value },
    ])
  }

  change = detail => (e) => {
    const { name, value, onChange } = this.props

    const valueIndex = value.findIndex(d => d.label === detail.label)

    value[valueIndex] = { label: detail.label, value: e.target.value }
    onChange(name, [...value])
  }

  render() {
    const { classes, label, value, error, helperText } = this.props

    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <table style={{ width: '100%' }}>
          <tbody>
          {value.map(detail => (
            <tr className={classes.field}>
              <td>
                <div className={classes.labelTd}>
                  <Typography className={classes.fieldLabel}>{detail.label}:</Typography>
                </div>
              </td>
              <td width="100%">
                <div className={classes.valueTd}>
                  <TextField className={classes.fieldValue} value={detail.value} onChange={this.change(detail)} />
                </div>
              </td>
              <td align="right"><IconButton onClick={this.add}><DeleteIcon /></IconButton></td>

            </tr>
          ))}
          <tr className={classes.field}>
            <td>
              <div className={classes.labelTd}>
                <TextField placeholder="Надпись" innerRef={(l) => { this.label = l }} />
              </div>
            </td>
            <td>
              <div className={classes.valueTd}>
                <TextField placeholder="Значение" innerRef={(v) => { this.value = v }} />
              </div>
            </td>
            <td><IconButton onClick={this.add}><PlusIcon /></IconButton></td>
          </tr>
          </tbody>
        </table>

        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}

DetailsField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  label: string,
  error: bool,
  helperText: oneOfType([string, bool]),
}

DetailsField.defaultProps = {
  label: null,
  error: false,
  helperText: null,
}

export default withStyles(styles)(DetailsField)
