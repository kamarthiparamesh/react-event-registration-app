import { FC } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import { hostUrl } from 'src/utils/env_public'
import Input from 'src/components/common/Input/Input'

import signInImage from 'public/images/sign-in.png'

import { AffinidiLoginButton } from 'affinidi-react-auth'
import * as S from './index.styled'

const LogIn: FC = () => {

  //Login Handler
  async function logIn() {
    //Call next-auth's signIn method by passing provider id as Affinidi
    await signIn('Affinidi', { callbackUrl: hostUrl })
  }

  return (
    <S.Wrapper>
      <S.Container direction='row'>
        <S.Logo direction='row' justifyContent='flex-start' flex={1}>
          <Image src={signInImage.src} alt='sign in' width={700} height={400} style={{ objectFit: 'cover' }} />
        </S.Logo>

        <S.LogInContainer justifyContent='center' alignItems='center'>
          <S.InnerLogInContainer>
            <S.Title>Log In</S.Title>

            <S.Content>Please enter a your email address to log in.</S.Content>

            <Input
              id='email'
              type='email'
              label='Email'
              placeholder='example@affinidi.com'
            />

            <S.ButtonContainer direction='column'>
              <S.Button variant='secondary'>Log In</S.Button>

              <S.OrContainer
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <S.Line />
                <span>OR</span>
                <S.Line />
              </S.OrContainer>

              <AffinidiLoginButton logInHandler={logIn}
                containerStyles={{ padding: 0, paddingTop: '2rem' }}
                buttonStyles={{ width: "100%", height: 'auto' }} />

            </S.ButtonContainer>

          </S.InnerLogInContainer>
        </S.LogInContainer>
      </S.Container>
    </S.Wrapper>
  )
}

export default LogIn
