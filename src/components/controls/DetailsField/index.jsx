import React, { Component } from 'react'
import { func, array, object, bool, string, oneOfType } from 'prop-types'
import {
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
    const result = [...value, { label: this.label.value, value: this.value.value }]
    this.label.value = ''
    this.value.value = ''

    onChange(name, result)
  }

  change = detail => (e) => {
    const { name, value, onChange } = this.props

    const valueIndex = value.findIndex(d => d.label === detail.label)

    switch (e.target.name) {

      case 'label':
        value[valueIndex] = { label: e.target.value, value: detail.value }
        break
      case 'value':
        value[valueIndex] = { label: detail.label, value: e.target.value }
        break

      default:
        break
    }

    onChange(name, [...value])
  }

  remove = detail => () => {
    const { name, value, onChange } = this.props
    const result = value.filter(d => d.label !== detail.label)

    onChange(name, result)
  }

  render() {
    const { classes, label, value, error, helperText } = this.props

    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <table style={{ width: '100%' }}>
          <tbody>
            {value.map((detail, index) => (
              <tr key={index} className={classes.field}>
                <td>
                  <div className={classes.labelTd}>
                    <TextField
                      fullWidth
                      name="label"
                      className={classes.fieldValue}
                      value={detail.label}
                      onChange={this.change(detail)}
                    />
                  </div>
                </td>
                <td width="100%">
                  <div className={classes.valueTd}>
                    <TextField
                      fullWidth
                      name="value"
                      className={classes.fieldValue}
                      value={detail.value}
                      onChange={this.change(detail)}
                    />
                  </div>
                </td>
                <td align="right"><IconButton onClick={this.remove(detail)}><DeleteIcon /></IconButton></td>

              </tr>
            ))}
            <tr className={classes.field}>
              <td>
                <div className={classes.labelTd}>
                  <TextField fullWidth placeholder="Надпись" inputRef={(l) => { this.label = l }} />
                </div>
              </td>
              <td width="100%">
                <div className={classes.valueTd}>
                  <TextField fullWidth placeholder="Значение" inputRef={(v) => { this.value = v }} />
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
  value: array.isRequired,
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
