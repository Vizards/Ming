import React from "react"
import {
  getApplicationType,
  autoRedirect,
  checkLogged
} from "@/config/routes"

import Brother from '@/pages/brother'
import Children from '@/pages/children'
import Exception from "@/components/Exception"

autoRedirect()

export default () => {
  const applicationType = getApplicationType()
  switch (applicationType) {
    case 'children':
      checkLogged()
      return <Children />
    case 'brother':
      return <Brother />
    case '403':
      return <Exception type="403" />
    case undefined:
      return <Exception type="404" />
  }
}
