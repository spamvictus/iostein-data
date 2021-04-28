const getCookiesObj = () => document.cookie.split('; ').reduce((a,c) => (c=c.split('=')) & (a[c[0]]=c[1]) || a, {});

const getCookieVal = key => getCookiesObj()[key];

const setCookie = (key, val, exp='Thu, 01 Jan 3000 00:00:00 UTC', path='/') => 
  document.cookie = `${key}=${val}; expires=${exp}; path=${path};`;