import React, { Component } from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip, withStyles } from '@material-ui/core'
import { object } from 'prop-types'
import connector from './connector'

const styles = theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.secondary.extraLight}`,
  },
  cell: {
    border: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 13,
  },
  head: {
    height: 48,
  },
  xsHidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
})

class EnhancedTableHead extends Component {
  sort = property => () => {
    const { actions, placesTable: { order } } = this.props

    actions.placesTable.sort({
      by: property,
      order: order === 'asc' ? 'desc' : 'asc',
    })
  }

  render() {
    const { classes, placesTable: { rows, order, orderBy } } = this.props
    return (
      <TableHead className={classes.root}>
        <TableRow classes={{ head: classes.head }}>
          {rows.map(row =>
            <TableCell
              classes={{ root: row.key !== 'title' ? classes.xsHidden : undefined, head: classes.cell }}
              key={row.key}
              sortDirection={orderBy === row.key ? order : false}
            >
              <Tooltip
                title="Sort"
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.key}
                  direction={order}
                  onClick={this.sort(row.key)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
  placesTable: object.isRequired,
}

export default withStyles(styles)(connector(EnhancedTableHead))
