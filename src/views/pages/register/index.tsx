// ** Import Next
import { NextPage } from 'next'
import Link from 'next/link'
//** Import Mui */
import { Box, Button, IconButton, InputAdornment, Typography, useTheme } from '@mui/material'
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
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import FacebookSvg from '/public/svgs/facebook.svg'
import GoogleSvg from '/public/svgs/google.svg'

type TProps = {}
const LoginPage: NextPage<TProps> = () => {
  /// State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** theme
  const theme = useTheme()

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('The Field Is Required').matches(EMAIL_REG, 'The Field is must email type '),
      password: yup
        .string()
        .required('The Field Is Required')
        .matches(PASSWORD_REG, 'The password is contain character,special character,number'),
      confirmPassword: yup
        .string()
        .required('The Field Is Required')
        .matches(PASSWORD_REG, 'The confirm Password is contain character,special character,number')
        .oneOf([yup.ref('password'), 'The confirm is must math with password'])
    })
    .required()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
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
          src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
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
                    name='confirmPassword'
                    label='Confirm password'
                    id='confirmPassword'
                    autoComplete='current-password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Confirm password'
                    error={Boolean(errors?.password)}
                    helperText={errors?.confirmPassword?.message}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? (
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
                name='confirmPassword'
              />
            </Box>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center ', justifyContent: 'space-between' }}>
              <Typography>{'Do you have already an account?'}</Typography>
              <Link
                style={{
                  color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }}
                href='/login'
              >
                {'Login'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
              <IconButton sx={{ background: theme.palette.error.light }}>
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
