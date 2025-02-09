import { Theme } from '@mui/material/styles'

export const ButtonContainedSX = {
    backgroundColor: (theme: Theme) => theme.palette.primary.main, 
    color: (theme: Theme) => theme.palette.background.paper,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: (theme: Theme) => theme.palette.secondary.main,
        color: (theme: Theme) => theme.palette.primary.main,
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    },
    '&:active': {
        backgroundColor: (theme: Theme) => theme.palette.secondary.main,
        color: (theme: Theme) => theme.palette.primary.main,
    },
    '& .MuiTouchRipple-ripple': {
        color: (theme: Theme) => theme.palette.primary.main,
    },
};
export const ButtonTextSX = {
    color: (theme: Theme) => theme.palette.primary.main,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: (theme: Theme) => theme.palette.background.default,
        color: (theme: Theme) => theme.palette.secondary.main,
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    },
    '&:active': {
      color: (theme: Theme) => theme.palette.secondary.main,
    },
    '& .MuiTouchRipple-ripple': {
        color: (theme: Theme) => theme.palette.secondary.main,
    },
};