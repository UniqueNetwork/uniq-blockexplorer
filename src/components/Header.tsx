import React, { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Select } from '@unique-nft/ui-kit'
import { useApi } from '../hooks/useApi'
import chains from '../chains'
import { chain } from '@polkadot/types/interfaces/definitions'

const Header: FC<{ className?: string }> = ({ className }) => {
  const { currentChain } = useApi()

  const navigate = useNavigate()

  const chainOptions = useMemo(() => {
    return Object.values(chains).map(({ id, name }) => ({
      id,
      title: name,
    }))
  }, [])

  const onSelectChange = useCallback(
    (value?: string) => {
      if (value) {
        navigate(`${value}/`)
      }
    },
    [currentChain]
  )

  return (
    <div className={className}>
      <Link to={`/${currentChain ? currentChain?.id + '/' : ''}`}>
        <img src="/logos/unique.svg" alt="Logo" className="header__logo" />
      </Link>
      <Select options={chainOptions} value={currentChain?.id} onChange={onSelectChange} />
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
