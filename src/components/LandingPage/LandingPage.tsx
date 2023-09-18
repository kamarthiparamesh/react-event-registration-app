import { FC } from 'react'
import Image from 'next/image'

import logo from 'src/public/images/react-conference.png'
import Box from '../common/Box/Box'

import * as S from './LandingPage.styled'

type Props = {
};

const LandingPage: FC<Props> = () => {

  return (
    <Box direction='row'>
      <S.ContentContainer justifyContent='center'>
        <S.Title>
          REACT INDIA 2023
          <div>Hybrid Edition</div>
        </S.Title>

        <S.Content>
          <p>3rd Oct 2023 - Remote Day</p>
          <p>5th Oct 2023 - Workshop Day</p>
          <p>6th - 7th Oct 2023 - In Person Conference Goa, India</p>
        </S.Content>
        
        <S.ButtonContainer direction='row'>
          <S.Button variant='primary' onClick={() => window.open('https://www.reactindia.io/conferences/2023/tickets', '_blank')}>Book Tickets</S.Button>
          <S.Button variant='secondary' onClick={() => window.open('https://www.reactindia.io', '_blank')}>Learn More</S.Button>
        </S.ButtonContainer>
      </S.ContentContainer>

      <S.Logo direction='row' justifyContent='flex-end' flex={1}>
        <Image src={logo.src} alt='logo' width={700} height={487} />
      </S.Logo>
    </Box>
  )
}

export default LandingPage
