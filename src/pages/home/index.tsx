import { FC, useEffect, useState } from 'react'

import DebtIcon from 'src/public/images/debt-icon.svg'
import FinanceIcon from 'src/public/images/finance-icon.svg'
import EducationIcon from 'src/public/images/education-icon.svg'

import * as S from './index.styled'
import { useSession } from 'next-auth/react'
import WelcomeBanner from 'src/components/WelcomeBanner/WelcomeBanner'
import LandingPage from 'src/components/LandingPage/LandingPage'
import Tile from 'src/components/common/Tile/Tile'

const Home: FC = () => {
  const { data: session } = useSession()
  const { userId, name } = session?.user || {}

  return (
    <S.Wrapper>
      {userId && <WelcomeBanner name={name} userId={userId} />}

      <LandingPage />

       <S.TileWrapper direction='column'>
        <S.TileHeader>Why Attend?</S.TileHeader>
        <span />

        <S.TileContainer direction='row' justifyContent='space-between'>
          <Tile text='3 Days Opportunity to meet, listen, and network with React Developers.' icon={DebtIcon}></Tile>
          <Tile text='600+ React Developers in Goa India (In person).' icon={FinanceIcon}></Tile>
          <Tile text='3K+ React Devs from all over the globe for our remote day.' icon={EducationIcon}></Tile>
          <Tile text='35+ Learn from some of the best front-end Speakers out there.' icon={EducationIcon}></Tile>
        </S.TileContainer>
      </S.TileWrapper>
    </S.Wrapper>
  )
}

export default Home

