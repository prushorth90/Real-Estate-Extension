import React, { useEffect, useState } from 'react'

import {Box,Button,Card,CardActions,CardContent,Grid,Typography} from '@material-ui/core'

export const FoodCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  )
}
