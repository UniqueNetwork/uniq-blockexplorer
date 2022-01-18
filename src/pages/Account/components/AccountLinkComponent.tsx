import React, { FC, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { shortcutText } from '../../../utils/textUtils'

interface AccountLinkProps {
  value: string;
  noShort?: boolean;
}

const AccountLinkComponent: FC<AccountLinkProps> = ({ value, noShort }) => {

  const { accountId } = useParams()

  const shortcut = useMemo(
    () => noShort ? value : shortcutText(value),
    [value, noShort],
  )

  if (value === accountId) return <>{shortcut}</>

  return (
    <Link to={`/account/${value}`}>{shortcut}</Link>
  )
}

export default AccountLinkComponent
