import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    '& .MuiInputLabel-root': {
      transform: 'none',
      lineHeight: 1.2,
      position: 'relative',
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize
    },
    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: 'transparent !important',
      border: `1px solid rgba(${theme.palette.customColors.main} , 0.2)`,
      transition: theme.transitions.create(['border-color ', 'box-shadow'], {
        duration: theme.transitions.duration.shorter
      }),
      '.MuiInputBase-input': {
        padding: '12px 10px'
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main
      },
      '&.Mui-focused': {
        boxShadow: theme.shadows[2],
        '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
          transform: 'translateX(4px)'
        },
        '&.MuiInputBase-colorPrimary': {
          borderColor: theme.palette.primary.main
        },
        '&.MuiInputBase-colorSecondary': {
          borderColor: theme.palette.secondary.main
        },
        '&.MuiInputBase-colorInfo': {
          borderColor: theme.palette.info.main
        },
        '&.Mui.InputBase-colorSuccess': {
          borderColor: theme.palette.success.main
        },
        '&.Mui.InputBase-colorWarning': {
          borderColor: theme.palette.warning.main
        },
        '&.Mui.InputBase-colorError': {
          borderColor: theme.palette.error.main
        },
        '&.Mui-error': {
          borderColor: theme.palette.error.main
        }
      },
      '&.Mui-disabled': {
        backgroundColor: `${theme.palette.action.selected} !important`
      },
      '&.MuiInputAdornment-root': {
        marginTop: '0 : !important'
      }
    },
    '& .MuiFormHelperText-root': {
      marginLeft: '10px'
    }
  }
})

const CustomTextField = (props: TextFieldProps) => {
  const { InputLabelProps, size = 'small', variant = 'filled', ...rests } = props

  return (
    <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
  )
}

export default CustomTextField
