let HOSTNAME
if (process.env.NODE_ENV === 'development') {
  HOSTNAME = '/admin/api'
} else {
  HOSTNAME = '/api'
}

export const API_HOSTNAME = HOSTNAME

export const API_POSITION = 'http://api.map.baidu.com/location/ip?ak=Pgs68e9RSdza5q9S1VAQ7a19cdCVBObA'

export const API_WEATHER = 'https://free-api.heweather.net/s6/weather/now?key=1ad52f36db2e45da893b283a2082af73&location='