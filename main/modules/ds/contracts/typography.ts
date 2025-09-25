interface DsTypographyHeadingToken {
  variant: 'heading'
  size: 'large'
  weight: 'extrabold'
}

interface DsTypographySubheadingToken {
  variant: 'subheading'
  size: 'medium'
  weight: 'regular'
}

interface DsTypographyBodyRalewayToken {
  variant: 'body-raleway'
  size: 'medium'
  weight: 'semibold'
}

type DsTypographyBodyToken =
  | { variant: 'body'; size: 'extra-large'; weight: 'semibold' }
  | { variant: 'body'; size: 'large'; weight: 'bold' }
  | { variant: 'body'; size: 'medium'; weight: 'semibold' }
  | { variant: 'body'; size: 'small'; weight: 'regular' }

interface DsUppercaseTypographyToken {
  variant: 'uppercase'
  size: 'small'
  weight: 'semibold'
}

interface DsUppercaseRalewayTypographyToken {
  variant: 'uppercase-raleway'
  size: 'medium'
  weight: 'semibold'
}

interface DsSpecialOpenSansTypographyToken {
  variant: 'special-opensans'
  size: 'medium'
  weight: 'extrabold'
}

export type DsTypographyToken = Prettify<
  | DsTypographyHeadingToken
  | DsTypographySubheadingToken
  | DsTypographyBodyRalewayToken
  | DsTypographyBodyToken
  | DsUppercaseRalewayTypographyToken
  | DsUppercaseTypographyToken
  | DsSpecialOpenSansTypographyToken
>
