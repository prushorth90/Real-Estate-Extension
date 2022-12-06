import React, { useEffect, useState } from 'react'

import {Box,Button,Card,CardActions,CardContent,Grid,Typography} from '@material-ui/core'

export const RestaurantCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              <Typography className="restaurantCard-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}
