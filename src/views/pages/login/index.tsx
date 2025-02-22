// ** Import Next
import { NextPage } from 'next'
import Link from 'next/link'
//** Import Mui */
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'
// ** component
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'

// ** image
import Image from 'next/image'
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import FacebookSvg from '/public/svgs/facebook.svg'
import GoogleSvg from '/public/svgs/google.svg'

type TProps = {}
const LoginPage: NextPage<TProps> = () => {
  /// State
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(true)

  // ** theme
  const theme = useTheme()

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('The Field Is Required').matches(EMAIL_REG, 'The Field is must email type '),
      password: yup
        .string()
        .required('The Field Is Required')
        .matches(PASSWORD_REG, 'The password is contain character,special character,number')
    })
    .required()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data ', { data, errors })
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <Box
        display={{
          md: 'flex',
          xs: 'none'
        }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
          alt='Login image'
          style={{
            height: 'auto',
            width: 'auto'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <CssBaseline />
            <Box sx={{ width: '400px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input Email'
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
            </Box>
            <Box sx={{ width: '400px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    id='password'
                    autoComplete='current-password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input password'
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <IconifyIcon icon='material-symbols:visibility-outline' />
                            ) : (
                              <IconifyIcon icon='material-symbols:visibility-off-outline-rounded' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                    checked={isRemember}
                    onChange={e => setIsRemember(e.target.checked)}
                  />
                }
                label='Remember me'
              />
              <Typography>Forgot password?</Typography>
            </Box>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center ', justifyContent: 'space-between' }}>
              <Typography>{"Don't have an account?"}</Typography>
              <Link
                style={{
                  color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }}
                href='/register'
              >
                {'Register'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 3 }}></Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
              <IconButton sx={{ background: theme.palette.error.main }}>
                <Image src={FacebookSvg} style={{ height: '40px', width: '40px' }} alt='facebook' />
              </IconButton>
              <IconButton sx={{ background: theme.palette.error.light }}>
                <Image src={GoogleSvg} style={{ height: '40px', width: '40px' }} alt='google' />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
export default LoginPage
