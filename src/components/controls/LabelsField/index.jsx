import React, { Component } from 'react'
import { array, bool, func, object, oneOfType, string } from 'prop-types'
import { Chip, FormControl, FormHelperText, FormLabel, IconButton, TextField, withStyles } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import Loading from 'components/Loading'
import connector from './connector'

const styles = {
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
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 10,
    marginTop: 0,
  },
}

class LabelsField extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.labels.load()
  }


  add = () => {
    const { name, value, onChange } = this.props
    const result = [...value, this.labels.value]
    this.filter('')
    this.labels.value = ''

    onChange(name, result)
  }

  filter = (value) => {
    const { actions } = this.props
    actions.labels.search(value)
  }

  changeFilter = (e) => {
    this.filter(e.target.value)
  }

  change = detail => (e) => {
    const { name, value, onChange } = this.props
    this.filter(e.target.value)

    const valueIndex = value.findIndex(d => d === detail)
    value[valueIndex] = e.target.value

    onChange(name, [...value])
  }

  remove = detail => () => {
    const { name, value, onChange } = this.props
    const result = value.filter(d => d !== detail)

    onChange(name, result)
  }

  handleClickChip = (label) => {
    const { name, value, onChange } = this.props
    const result = [...value, label]

    this.filter('')
    this.labels.value = ''

    onChange(name, result)
  }

  render() {
    const {
      classes,
      label,
      value,
      error,
      helperText,
      placeholder,
      labels: { loading, filterLabel },
    } = this.props
    if (loading) return <Loading />

    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>

        {value && value.map((detail, index) => (
          <div className={classes.labelTd} key={index}>
            <TextField
              fullWidth
              name="labels"
              value={detail}
              placeholder={placeholder}
              onChange={this.change(detail)}
            />
            <IconButton onClick={this.remove(detail)}><DeleteIcon /></IconButton>
          </div>))}

        <div className="flex">
          <div className={classes.valueTd}>
            <TextField
              fullWidth
              placeholder={placeholder}
              inputRef={(v) => { this.labels = v }}
              onChange={event => this.changeFilter(event)}
            />
          </div>
          <IconButton onClick={this.add}><PlusIcon /></IconButton>
        </div>

        <FormHelperText error={error}>{helperText}</FormHelperText>

        <div className={classes.flex}>
          {filterLabel && filterLabel.map((lab, index) =>
            value.findIndex(d => d === lab) < 0 &&
            <Chip
              key={index}
              label={lab}
              className={classes.chip}
              onClick={() => this.handleClickChip(lab)}
            />)}
        </div>

      </FormControl>
    )
  }
}

LabelsField.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  labels: object.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  value: array.isRequired,
  label: string,
  placeholder: string,
  error: bool,
  helperText: oneOfType([string, bool]),
}

LabelsField.defaultProps = {
  label: null,
  placeholder: null,
  error: false,
  helperText: null,
}

export default withStyles(styles)(connector(LabelsField))
