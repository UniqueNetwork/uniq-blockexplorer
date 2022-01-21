import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Select } from '@unique-nft/ui-kit'
import { useApi } from '../hooks/useApi'
import config from '../config'

const Header: FC<{ className?: string }> = ({ className }) => {
  const { currentChain } = useApi()

  const navigate = useNavigate()
  const onSelectChange = useCallback(
    (value?: string) => {
      if (value) {
        navigate(`${value}/`)
      }
    },
    [currentChain]
  )

  return (
    <div  className={className}>
      <Link to={`/${currentChain ? currentChain?.network + '/' : ''}`}>
        <img src="/logos/unique.svg" alt="Logo" className="header__logo" />
      </Link>
      <Select
        options={Object.values(config.chains).map(({ network, name }) => ({
          id: network,
          title: name,
        }))}
        value={currentChain?.network}
        onChange={onSelectChange}
      />
    </div>
  )
}

export default styled(Header)`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
