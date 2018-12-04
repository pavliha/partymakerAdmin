import React, { Component } from 'react'
import { array, bool, func, object, oneOfType, string } from 'prop-types'
import { Chip, FormControl, FormHelperText, FormLabel, IconButton, TextField, withStyles } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'

const styles = {
  root: {},
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
  state = {
    labels: ['Природа', 'Активный отдых', 'Спорт', 'Бухичь'],
    filterLabel: ['Природа', 'Активный отдых', 'Спорт', 'Бухичь'],
  }

  add = () => {
    const { name, value, onChange } = this.props
    const result = [...value, this.labels.value]
    this.labels.value = ''

    onChange(name, result)
  }

  change = (e) => {
    const { name, onChange } = this.props
    const { labels } = this.state

    const search = e.target.value.toLowerCase()
    let resultSearch = labels.filter((label) => {
      const allInfo = `${Object.values(label)
        .join('')}`
      return allInfo.toLowerCase()
        .includes(search)
    })

    if (e.target.value === '') resultSearch = labels

    this.setState({
      filterLabel: resultSearch,
    })

    onChange(name, e.target.value)
  }

  remove = detail => () => {
    const { name, value, onChange } = this.props
    const result = value.filter(d => d !== detail)

    onChange(name, result)
  }

  handleClickChip = (label) => {
    const { name, value, onChange } = this.props
    const result = [...value, label]
    this.labels.value = ''

    onChange(name, result)
  }

  render() {
    const { classes, label, placeholder, value, error, helperText } = this.props
    const { filterLabel } = this.state

    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>

        {value.map((detail, index) => (
          <div className={classes.labelTd} key={index}>
            <TextField
              fullWidth
              name="labels"
              value={detail}
              placeholder={placeholder}
              className={classes.fieldValue}
              onChange={event => this.change(event)}
            />
            <IconButton onClick={this.remove(detail)}><DeleteIcon /></IconButton>
          </div>))}

        <div className="flex">
          <div className={classes.valueTd}>
            <TextField fullWidth placeholder={placeholder} inputRef={(v) => { this.labels = v }} />
          </div>
          <IconButton onClick={this.add}><PlusIcon /></IconButton>
        </div>

        <FormHelperText error={error}>{helperText}</FormHelperText>
        <div className={classes.flex}>
          {filterLabel.map(lab =>
            value.findIndex(d => d === lab) < 0 &&
              <Chip
                key={lab}
                label={lab}
                onClick={() => this.handleClickChip(lab)}
                className={classes.chip}
              />)}
        </div>
      </FormControl>
    )
  }
}

LabelsField.propTypes = {
  classes: object.isRequired,
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

export default withStyles(styles)(LabelsField)
