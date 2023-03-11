import React from 'react'

import {Box,Card,CardContent} from '@material-ui/core'

export const NearbyCardPartial: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  )
}
