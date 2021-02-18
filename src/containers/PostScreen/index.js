import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {Formik, Field} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calcHeight, calcWidth} from '../../settings/dimensions';
import * as ImagePicker from 'react-native-image-picker';
import {PostAdd} from '../../store/Actions/Post/PostAdd';
import {
  CustomLoginInput,
  CustomPasswordInput,
  HomeHeader,
  SafeStatusView,
} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostAddValidation from '../../schema/PostAddValidation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {
  categoryPlaceHolder,
  categoryList,
  provincePlaceHolder,
  provinceList,
} from '../../data';
class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      loadingButton: false,
    };
  }
  _handleSubmit = async (values, {resetForm}) => {
    await this.setState({loadingButton: true});
    const {province, category, description} = values;
    let district = 0;
    let resp = '';
    let defaultResp =
      'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AABKwElEQVR42u3dDbzkVGH38ZMzuXNn7t59YRdYYAF53cUFQfAjIn3Bd6uPUKpiFXyptFgU0VYfa63to7S2VltbraItWpXH1/pa2z62KlZQUaRVfMEFBASWxfIO+3bvvCV5coaZu7m5mZlMcpKczPzSXu/ukvmemZOT/JMzyTlCsLCwsLCwsEzdYqUFnva0J1khx7viiis9PDw8PDw8PHM9O2X4V8L/5hfu4uHh4eHh4Znt2QkLVmcclfCZh//j4OHh4eHh4Znv2QkLt6MKT9KVgYeHh4eHh5e/ZycovBpReDvFh8HDw8PDw8PL0RvrBKBX+GxE4a0UHwYPDw8PDw8vR69v2jFXlP6vWkThzYQfBg8PDw8PDy9/TznK9OyYhdcjCm8kuYMRDw8PDw8PrxCvfwNh98TBjll48HEDVehiig8z1zv7wMPDw8PDw8vHswKZP/wEoLdysNvB6r1oIcWHmY84k8HDw8PDw8PLzuvfQOj1w18M+gpgyA0HezR/GDw8PDw8PLxsvWrwyl8t6v4Be8iZghXqdligsvHw8PDw8Erl1cJX/r7VHTTIjgj/qEEGFqlsPDw8PDy8Unn10JX/shEDwz0AUcMLNqhsPDw8PDy8UnlzEeHfCT46aAdeEBX+TSobDw8PDw+vdJ5a3IC3YtAgu/eC8LTAaUYsYuPh4eHh4eEV63mhi/kVed7vAdA1VjEbDw8PDw8PzxyvMSjP7Ygrf4fwx8PDw8PDK7U3ctAgGfo74Y+Hh4eHh1d+b+Sj+0vDAiYpmMrGw8PDw8Mrp2eJFAuVjYeHh4eHV04v8QkAlY2Hh4eHh1deL9EJAJWNh4eHh4dXbs+icvDw8PDw8KbPs6gcPDw8PDy86fLGOgGgsvHw8PDw8CYj/NUIwBaVg4eHh4eHNzWecpTpyZiFz1HZeHh4eHh4pQ//Sv/vMkbh9dB6VDYeHh4eHl75wt8OenLEyjUqGw8PDw8Pr/ThXw179pCVZ6lsPDw8PDy80nvVgNNd1Lw/dswzBVXoApWNh4eHh4dXKq/WM/rhr+b+cdQf7IjwtyMKX6Sy8fDw8PDwSuXVQ1f+6rfTXyfcA1CJKLxBZePh4eHh4ZXKm4sI/47q+l9xAuC/ICr8m1Q2Hh4eHh5e6Ty1uAGvFQx/0S8wMDCA7P2bFbVymSpn69Yz5p3ZxlNcYT3R8rwThOcd5wq5zv+Ea2xr6YaIpcUd+5PuW2TEcEp4eHh4eKXyXFe4e6Ur7hVS/tz/+488S3yn5cx+444fXfVwCU8mvN4JgPpZjMpzK/Ci/kmACHcTlCX8zzjjDPsXu5tnep64wP/rU6VYGfQ0fjw8PDy8uIvruh3Lsr4upfWRg9fMfM22K05JehL63/cPvIcvfAKgfpyyhf8jwd843/KsP/H/eiiNHw8PDw9Pv2f9Qlre3xy4euZy/0SgJcz+GkGF/9Cn98InAG7Zwv+Yx552hrC8f5DC2kJjxcPDw8PL2vND6Gbpuq+88YfXfr1MeTnoBMBKEvxFfphHnXFGrbqz8Xa/a+b3aKx4eHh4eAV4f+fuXvcHt9zyH82yhb8QY0wHbNKHOerEJx5YqThftIQ8ncaKh4eHh1eY54pr2o539m3Xf++eMoV/qhOAoj7MMaecfrTldL5uSfkoGiseHh4eXtGeH1C3CUs+/ZYffOfWsoR/4hOAoj7MlpOecIT/j1f5W+ZwGiseHh4enjmee5d/292v/OzH195WhvDvfs6yhP/Wraet94T3NcIfDw8PD888T27yU+yrxz3+8RvKEP5j9wAU9WHUY37/s2vx3/0KfhqNFQ8PDw/PVM9f/RuHrJl9xsyM5Zoc/mqpmB7+aqmuP/itlrBeTuPCw8PDwzPZ85kj9zQ71tq5mf82OfzV039WEYWP4x19ymmnVBz3Wn9oxgqNCw8PDw+vBJ5btcVTD1xTu8608A8M/e/JmIXPFXImc845lYrn/SPhj4eHh4dXIk+2Ot579lYqFQPDfylPKzEKr4vl0wTn9mGOra55iT/QzytpXHh4eHh45fKsjY3F9h1r6vZ3DQp/W+ybKGjwTYC9leti+SyBuYX/1q1bq52Z1TcPu+ufxoqHh4eHZ6rnOO4dM+09m7dt29YyIPyrPWNplkA5ZOVZUeANDM7MmnMIfzw8PDy8snpqwLp2dc0LCw5/GZHnQg3/L4ecKQRXdkXO32F40n0NjQsPDw8Pr8yeZ3mvLjj8a2HPt7pTGsuI8LcjCl/IM/yPO/GJJ/hv7VQaFx4eHh5emT1/ptrHbznltMcUFP71CM/Z996WL5WIlRfzvoHBqbjPp3Hh4eHh4U2C57niNwsI/6in9zrBmX9l4AVR4d8o6O7F59G48PDw8PAmwXOFe1bO4T8fusBXXisY/qJfYGBggP7d/lbUynmE/+bHPW5/4c7cR+PCw8PDw5sUr+NYG3/+4+/em1P495/ac3s/i1F5LoMnAsPOFHK68heWa59O48LDw8PDmyTPtsTpOYZ/0GsMyvPwPQArviPIM/y7L/Csx9O48PDw8PAmyrO8x+Uc/v0r/4GeHfq7U2T4997xsVLzxvNHExRPe9Kvihc9/2zx6C1bRLU60/23Wq3mjzI89ozIwnVd0Wg0/JMVb1kZeHh4eHjl9Nrttrh+243io5/4tPjqf1657PVaZgm0xHE5X/mPfHqvfwLgpZhRSO8sRZ44OmobpQn/1736QnHuOc+l8ePh4eHhRS4zMzPi5JMe0/358Mc+Kd757vdp7UnwnwQ4osiJ9SJ7NdT/JLnqz+pMRlreJp3dNurKn/DHw8PDw4u7nP+Sc8XTn3yG5q8R3ENMCv+lEwBTwl95UshVusJfbTzV7U/jx8PDw8Mbx3vROWdrDH91E6Dcz6TwT3wCkGU3hv+85Jyu8FeL+s6fxo+Hh4eHN4533ObN2sJfPvKg/axJ4Z/oBCDr7zD87wBsXeGvFm74w8PDw8Mb15utVvWF//K8NSL8xz4ByOkGBq2PatD48fDw8PCSeLrzyKTwH+sEIK+7F3U/p0njx8PDw8NL4unOI5PCX40AbJsU/srTWdlq49H48fDw8PCSeLrzyITwDwz978mYhc8Jw+5ejFPZSRYaPx4eHh5eEk93HmUU/pWl9xqj8LpYOasQ4Y+Hh4eHh1eu8LeDnhyxco0rfxo/Hh4eHl7pw78a9uwhK88S/jR+PDw8PLxSh7/shX/f6S5qBGA75pmCKnSB8MfDw8PDwytV+Nd6Rv9dqbl/HPUHOyL87YjCFwl/PDw8PDy8UoV/PXTlr347/XXCPQCViMIbhD8eHh4eHl6pwn8uIvw7wcn/7MALosK/Sfjj4eHh4eGVKvzn+28r4LXCM//avReEP07kyoQ/Hh4eHh7hb3z4W6Er/2ZUnvd7AMKFtwl/PDw8PDy8UoZ/0GsMynM74srfIfzje3/2V+8R23fsWDqPshI2rG5l+WalUhFv/z9vFOvWrmXnxMPDwyP8k3rKGXoDf7gmCP8xPZ3hr6rMcTrivgceZOfEw8PDI/zTeCMf3e/3AHgpZhSa6m7/dWvXiId37tYS/v1lftUqdk48PDw8wj9Tr3sCkOSqP6sPs+PBhrbKVkvWjeuSN71eLC62uu7Ywe87Td9rd9ribe/6u6WehI0HHsDOiYeHh1ewpzP8+9d3wqARdu2knyLjRxe0VLbaeFk3rvX7rRdyQzpvYXFxKfxVT4LjuOyceHh4eAV7uvNIGDa8fqI+kZy6MXRUdjkaq7cv/Pv/nZ0TDw8PzwxPdx4JQ+bWkUUWTvj33q9MfgMhOyceHh4e4Z/Ek0UWTvjv8wh/PDw8PMI/r/wd6wQgr7sXNVd2KRqrZbFz4uHh4Znm6c4jk8JfjQBsF1H4ME9nZauNR+OfTm/Xrj3ig5d9Rlz97e/7T2k0o9TE58Oq7Ec96hDx0pedLZ54+slsDzy8CfV055EJ4d8b+l+ZnoxZ+Jww7O7FOJWdZKHxl99rNVviTW98l7jia9/RHv7dxuq/l9tvv0v86SWXim9e9V9sDzw8vEzyKKPwr8Q66gXmE5aEP42/LN4///PXxc9/fucgNVX4h5cPvP/joumfcLA98PAI/xKEvx305IiVa1z50/jL5l155fdyCX/lPfzwbnH9T25ie+DhEf6mh3817MkhK88S/jT+Mnp3br87l/BfKu/Oe9geeHiEv6nhLyPyvDsCsB3zTEEVukD445XB63Q6uYV/vzy2Bx4e4W9o+Nd6Rv9dqbl/HPUHOyL87YjCFwl/vDLunFmHf3cnsmfYHnh4hL+J4V8POP3fztKxK/SaSkThDcIfj/Af7CWZCIrti4dH+Gcc/nMR4d8JTv5nB14QFf5Nwj9/TznsnOUIf04+8fAIfwPDfz504FJeKzzzr+y9IPxxCP8CGxc7ZzqP8MfDw5vy8I+6mF/xLvs9AOGV21ErE/7ZNy7PN9k59U7hSfjj4eFNcfg3BuW5HXHl7xD+xYX/vq9r2DnTeoQ/Hh7eFIe/cobewB+uCcK/AM/zXMKf8MfDwyP8dV75j3x0v98D4KWYUYjw19Jtzc5J+OPh4RH++XndGkly1Z/Vh9FZ2WopQ2N1l31Ads60HuGPh4enw9OdRyaFf6rLpIwfXdBS2WrjlevK1RKW5LnytB7hj4eHl8UNxWnzSBg2vH6io1tO3Rg6Krt04U/YFNPNR/jj4eENPj7rzSNhyNw6ssjCCf/e+5WEP+GPh4dH+Oebv7LIwgn/dN3W7JyEPx4eHuGf+IZ7w8Lf01zZpWislsXOSfjj4eGZ5unOI5PCX40AbJsU/srTWdlq49H48bIOf+ZuwMObTE93HpkQ/r2h/5XpyZiFzwnD7l6MU9lcyeFlHf5q6XTabA88PDzteZRR+FdiHfUC8wlLwp/GT/hHe2wPPDy8koS/HfTkiJVrXPnT+An/eB7bAw+P8Dc4/Kthzx6y8izhT+Mn/Al/PDy8Uoe/7IV/3+kuagRgO+aZgip0gfDHI/wJfzw8vFKFf61n9N+VmvvHUX+wI8Lfjih8kfDHI/yjPdueYXvg4RH+JoZ/PXTlr347S8eu0GsqEYU3CH88wn+wx9wNeHiEv4HhPxcR/p3g5H924AVR4d8k/PP3eK68POHPySceHuFvYPjPhw5cymuFZ/6VvReEPw7hX2DjYudM5xH+eHh4Ux7+URfzK95lvwcgvHI7amXCP/vG5bk8V657Ck/CHw8Pb4rDvzEoz+2IK3+H8I/v/dlfvUds37Fj6TzKksnDxutevXpi1+7dYr91a9k5U3qEPx4e3hSHv3KG3sAfrgnCf0xPd/ir5YGHHmLnJPzx8PAI/zTeyEf3+z0AXooZhaa623/d2jXi4Z27tYW/WtauXs3OSfjj4eER/pl63ROAJFf9WX2YHQ82tFW2WrJuXJe86fVicbGV6FEw5TR9b7HRFH/5nvct9SRsOuQQds4UHuGPh4enw9MZ/r3FmPAP9gCYdCajrbLVxsu6ca3fb72QG9J5CwuLS+GvehJ4rjydR/jj4eFlcUNx2jwShg2vn+jollM3ho7KLk1jTXMPATu7WeMGsD3w8CbL051HwpC5dWSRhRP+vfcrCX/CHw8Pj/DPN39lkYUT/um6rdk5CX88PDzCP/EN94aFv6e5skvRWC2LnZPwx8PDM83TnUcmhb8aAdguovBhns7KVhuPxo+XdfgzdwMe3mR6uvPIhPDvDf2vTE/GLHxOGHb3YpzK5koOL+vwV0un02Z74OHhac+jjMK/EuuoF5hPWBL+NH7CP9pje+Dh4ZUk/O2gJ0esXOPKn8ZP+Mfz2B54eIS/weFfDXv2kJVnCX8aP+FP+OPh4ZU6/GUv/PtOd1EjANsxzxRUoQuEPx7hT/jj4eGVKvxrPaP/rtTcP476gx0R/nZE4YuEPx7hH+3Z9gzbAw+P8Dcx/OuhK3/121k6doVeU4kovEH44xH+gz3mbsDDI/wNDP+5iPDvBCf/swMviAr/JuGfv8dz5eUJf04+8fAIfwPDfz504FJeKzzzr+y9IPxxCP8CGxc7ZzqP8MfDw5vy8I+6mF/xLvs9AOGV21ErE/7ZNy7P5bly3VN4Ev54eHhTHP6NQXluR1z5O4R/ceEfeEqDnTOlR/jj4eFNcfgrZ+gN/OGaIPwL8DzPJfwJfzw8PMJf55X/yEf3+z0AXooZhQh/Ld3W5u9Mzo7bReOT/yA6264Ts+2maCTp5VD9UZ4lgpuzO+Sk5Yn2QZvE7LOeL2pnvcj/R5n48xL+eHh4Ux7+sbxujSS56s/qw+isbLWUobG67vI4NDX8d7/lItH+4fe64W8l2BbDwl/9du6+Syx85D1i4bK/TvV5CX88PDwdnu48Min8U10mZfzogpbKVhuvXN3Wln/ha+Zz5erKXywuLoW17vBfdtL2758Tzu03J/68hD8eHl4WNxSnzSNh2PD6iY5uOXVj6Kjs0oW/qWGjuv3zCP/+0v7xf+fazUf44+HhDT4+680jYcjcOrLIwgn/3vuVZoe/8rLq9h/4usYC4Y+Hh0f4Z5i/ssjCCf903dZ5vr88w58rfzw8PMI/2/wd60iX192Lmiu7FI3VsiZvZyL8Ofji4ZXd051HJoW/GgHYNin8laezstXGo/ET/lmHP3M34OFNpqc7j0wI/97Q/8r0ZMzC54Rhdy/GqWyu5Aj/rMNfLZ1Om/aCh4enPY8yCv9KrKNeYD5hSfjT+An/aI/2goeHV5Lwt4OeHLFyjSt/Gn8R4a+7Wz2r8A8utBc8PMLf4PCvhj05ZOVZwp/GX0j4K6/TIfzx8PAIfz35G87z7gjAMuaZgkv44+UW/t7yu28Jfzw8PMI/cf6u6Mn3LUf9wY4Ifzui8EXCHy+v8Pc0hWse4d/diewZ2gseHuFvYvjXA07/t7N07Aq9phJReIPwxyP8B3smzt2Ah4c39eE/FxH+neDkf3bgBVHh3yT8CwhXw58rzyP81fYuQ/hz8omHR/gbGP7zoQOX8lrhmX9l7wVWxDGZ8C+ocU39lb/ybDvx5yX88fDwpjz8oy7mV7xLO3DMDa7cjlqZ8M++cXmuS/grL0W3OuGPh4dH+O87zA7KczvimOwQ/vG9P/ur94jtO3YsxZclk4eN17169cSu3bvFfuvWTm/4a9q+hD8eHt4Uh79yht7AH64Jwn9MT3f4q+WBhx4yb2ci/Al/PDzCv0xX/gujvH4PgJdiRqGp7vZft3aNeHjnbm3hr5a1q1ebtzMR/oQ/Hh7hX5bwj+V1TwCSXPVn9WF2PNjQVtlqybpxXfKm14vFxVai76yV0/S9xUZT/OV73rcUh5sOOcTcncnw8H9kOxD+eHh46T2d4d9bjAn/YA+ASWcy2ipbbbysG9f6/dYLuSGdt7CwuBSHqifB2OfKSxD+aabwJPzx8PCCnu48EoYNr5/o6JZTN4aOyi5NY01zDwHhb9agQRx88fAmy9OdR8KQuXVkkYUT/r33Kw0Pf+UR/hws8fAI/4kJ/7GPcoR/dp7pYUP4c7DEwyP8Jyf8xzrS5XX3oubKLkVjtSzmCiD88fDwTPN055FJ4a9GALaLKHyYp7Oy1caj8RP+WYe/6XM34OHh5dczOyyPTAj/3tD/yvTsmIXPiZzuXtx88mnaKpsrOcI/6/BXS6fTpr3gpfY6X71OtC7/T9G5wR9crN2Jv79Z/vDhgZ3L39VEzZOiFW7hB6wVM089SdQueraw1q9me4ipHDdAOZWeMfwxwMB8wjKP8C+6smn8hH8Sj/aCl9ZTwd/46y+Ov78NCP+o/c29b6dofvqbon31NrH6s38orNV1tsf0hb8dcAYf+Xor14Rhzy0S/lMyUZDmbvWswj+40F7wknrNf/iPTMN/2Xu5837R+vJ/sz2mL/yrYU8OWXmW8KfxFxL+yut0CH+8qfG83Yu5hP+S8dAetsd0DRcczvPuCMAy5pmCS/jj5Rb+3vK7bwl/PDx94c/2mLrwX9GT71uO+oMdEf52ROGLhD9eXuHvaQrXPMK/uxPZM7QXPMKf8Dcx/OsBp//bWTp2hV5TiSi8QfjjEf6DPWPnbsAj/Ae9Px5dnYbwn4sI/05w8j8ZeAHhb8rObvjOmUf4q+1dhvDn5BOvbOHf9RweXZ2CKYLDT++1wjP/yt4LrIg20iT8i2lcU3/lrzzbTvx5CX88wn+Ex/aY9PC3IvJ8xbu0A8fc4MrtqJUJ/+wbl+e6hL/yUnSrE/54hH9Mj+0xDeHfGJTndkQbcQj/4sJfCMJf1w1NhD8e4U/4T3H4K2foDfzhmiD8i9jZPdfo8O96hD/hj0f4E/5luvJfGOUtDQuYYkYhwl+DZ3T4K4/wJ/zxJiP8lVfh0dUJD/9YXrdGklz1Z/VhdFa2WsrQWF13eRwavTMZHv6P3DtA+OMR/sM8yaOrsTzdeWRS+Ke6TMrwTEZbZauNV6bGqqrSkgY/V16C8E8zhSfhjzcN4c+gQeP0zOrNI2HY8PqJjm45dWPoqOzShb+xYVOS8Ddh3ADCEG9sj/A3/PisN4+EIXPryCILJ/x771caHv7KI/w5WOJl5xH+hH8B+SuLLJzwT9dtnef7I/w5WOLl4BH+hH9O+TvWkS6vuxc1V3YpGqtlMVcA4Y9H+BP+pnm688ik8FcjANsmhb/ydFa22ngcjAj/rMPfY2IVPMJ/Ij3deWRC+PeG/lemJ2MWPicMu3sxTmVzJUf4Zx3+aul0mFgFL6VH+E+EpzuPMgr/SqyjXmA+YUn40/gJ/2iP9oKX1iP8Cf+cwt8OenLEyjWu/Gn8RYS/7m71rMI/uNBe8HLd3wh/wn+88K+GPTlk5VnCn8ZfSPgrr9Mh/PHwCH/CX0/+hvO8OwKwjHmm4BL+eLmFv7f87lvCHw+P8Cf8E+fvip5833LUH+yI8LcjCl8k/PHyCn9PU7jmEf7dnchmYhU8wp/wNzL86wGn/9tZOnaFXlOJKLxB+OMR/oM9a0omVrmv2RbvufEe8W/b7xe37fYnsfLi73yWv26l01rx745d9QNtX/2trdri1APXiou2HirOOuIA9reswp9HV6ch/Ociwr8TnPzPDrwgKvybhH8BO7vhO2ce4a+2dxnCf5pOPp/9tW3ixp0LY3txw18tO1sd8bUdD3R/vvCME8XZRxxI+IsMJgpy2mKW8J/0KYKDBy7ltcIz/8reC6yINkL4F9S4pv7KX3m2nfjzEv7ZeFmHf3i5/sE9hL/IaJZAwn/Swz/qYn7Fu7QDx9zgyu2olQn/ld6b3/YOsf3OHcviy5LJw8bzzZ27dol1a9dMb/grL0W3OuFvhpcm/Km/nKYIJvynIfwbg/JcRrSRDuEf39Md/qrKHnjooekOf03bl/An/Al/wn+Kw185Q2/gD9eEQ/iP5/Wv1HWFv1rWzM+btzMR/oQ/4U/4E/5luvJfGOX1vwLwUswoNNXf+b/lja8Tu3buFrPdWf3G3z2Vs3PnLvH2d7936d/237DBvJ2J8Cf8Cf/JCH/lVXh0dcLDP5bXPQFIctWf1YfZ8WBDW2WrJevGNb9qVTew03i12eqyODR6ZzI8/B85CSP8JyH8p22WxdzC3/ckJ2OxPJ3h348MYdAIu4mPlBk/uqClstXGK1Nj7X+NYOxz5SUI/zRTeBL+5oS/8txWk/BnlsBCPd15JAwbXj/R0S2nbgwdlV268Dc2bEoS/iaMG0D4pw9/5U1V2BD+hh+f9eaRMGRuHVlk4YR/7/1Kw8NfeYQ/B8scw79M+68Wj/An/AvIX1lk4YR/um7rUsxXTvgT/oR/fI/wJ/xzyt+xjnR53b2oubJL0Vgti7kCCH/Cn/An/E3zdOeRSeGvRgC2TQp/5emsbLXxeNSF8M86/KftbvU8wr+7NaqzhD/hX7qe2WF5ZEL494b+V6YnYxY+Jwy7ezFOZXMlR/hnHf5q6XTahL/m8FeeNU2PqhH+E+HpzqOMwr8S66gXmE9YEv40fsI/2iP89Yf/tA0aRPgT/jmFvx305IiVa1z50/iLCH/d3epZhf+yQJvw9kL4T+64ARz/piL8q2FPDll5lvCn8RcS/srrdAh/wwdFIfwJf7xShL+MyPPuCMAy5pmCS/jj5Rb+3vK7bwl/szzCn/DHK1X4r+jJ9y1H/cGOCH87ovBFwh8vr/D3NIVrHuHf3YnsFBOr7NwuxC1/I6x7v+LvZXf4B3NH1GbUGOTjN2rXr7tmW3a3grW0PTxRm5sXcv2pwjvyIiEOOovwJ/w5/k1P+NcDTv+3s3TsCr2mElF4g/DHI/wHe2nuVhfX/C9/j7h5X1inCP+GH/7B2l/yOjuFuPdr/knG14R36heEOPhswn/aw3/KHl2d0vCfiwj/TnDyPxl4AeFvys5u+M6ZR/ir7V2G8E/d/rIO/7C36/rE7YXwn4zw73pOm/Cf/CmCw0/vtcIz/8reC6yINtIk/ItpXFN/5a882078eUsT/qPCWnf4p2wvhP+EhL/lEv6TH/5WRJ6veJd24JgbXLkdtTLhn33j8lyX8Fdemm51wl97+JswbgDhn8GIgYT/NIR/Y1Ce2xFtxCH8iwt/IQh/XTc0GR/+ansQ/oQN4U/4ZxP+yhl6A3+4Jgj/InZ2zzU6/Lse4S8ymSiI8CdsCH/CP5sr/4VRXr8HwEsxoxDhr2WQFcN3JsLfjPZH+BP+OrzKDOE/2eEfy+vWSJKr/qw+jM7KVksZGqvrLo9Do3cmw8P/kXsHCP9JCP9pm2Uxt/D3PcnJWCxPdx6ZFP6pLpMyPJPRVtlq45VrhDV/ABcpzZ0FrQThn2YKT8LfrImC3FaT8GeWwIJ7ZvXmkTBseP1ER7ecujF0VHbpwl+YunOWJPxNGDeA8E8f/sqbqrAh/I0f/lpnHglD5taRRRZO+PferzQ8/JVH+E9G+GvuVs9jiuCpCBvCn/AvIH9lkYUT/um6rUsxXznhb1D4+17TIfxN9gh/wj+n/B3rSJfX3YuaK7sUjdWymCuA8M8h/JWnaZZFwp/wnwZPdx6ZFP5qBGDbpPBXns7KVhuPR10I/6zDX/vd6lmFf9AzPPy7W6M6S/gT/qXrmR2WRyaEf2/of2V6Mmbhc8KwuxfjVLag8RP+GYe/WjqdNuGfwURB1jQ9qkb4T4SnO48yCv9KrKNeYD5hSfjT+An/aK9c4S9KEf7TNmgQ4U/45xT+dtCTI1auceVP4y8i/HV3q2cV/ssCzfTwV95sJXF7Ifwnd9wAjn9TEf7VsCeHrDxL+NP4Cwl/5XU6hH8mEwXpm2WR8Cf88UoR/jIiz7sjAMuYZwou4Y+XW/h7y+++JfwL9AY8GkX4E/54pQn/FT35vuWoP9gR4W9HFL5I+OPlFf6epnDNI/y7O5GdfGKVJuFP+BP+hH924V8POP3fztKxK/SaSkThDcIfj/Af7FmputUJf8K/gPCfsomWpjT85yLCvxOc/E8GXkD4m7KzG75z5hH+MsXd6nmGv7b2Z3j4q/ZC+E9G+Hc9p034T/4UweGn91rhmX9l7wVWRBtpEv7FNK6pv/JXnm0n/ryEfzYTBRH+ExL+lkv4T374WxF5vuJd2oFjbnDldtTKhP9K781ve4fYfueOZfFlyeRh4/nmzl27xLq1a6Y3/JWn8W51wr+Y9kL4l2CKYMJ/GsK/MSjPZUQb6RD+8T3d4a+q7IGHHpru8Ne0fY0Pf7U9CH/ChvAn/LMJf+UMvYE/XBMO4T+e179S1xX+alkzP2/ezkT4i0wmCiL8CRvCn/DP5sp/YZTX/wrASzGj0FR/5/+WN75O7Nq5W8x2Z/Ubf/dUzs6du8Tb3/3epX/bf8MG83Ymwt+M9kf4E/46vMoM4T/Z4R/L654AJLnqz+rD7Hiwoa2y1ZJ145pftaob2Gm82mx1WRwavTMZHv6PnIQR/pMQ/t6UPaqWW/j7nuRkLJanM/z7kSEMGmE38ZEywzMZbZWtNl6ZGmv/awRjZ0ErQfinmcKT8DdrlkC31ST8mSWwUE93HgnDhtdPdHTLqRtDR2WXLvyFqTtnScLfhHEDCP/04a+8qQobwt/w47PePBKGzK1jE/7FNy4pDQ9/5RH+kxH+mrvV85giOOn7+6dPf1l89zs/EDt23C327l3Q1fm5rL3Y/ngV69evFccdd4w47yVnicMPPzhZeyH8Cf8C8tcusnDCP123dZ7vr0H4T0D4+17TmYrwV8tHP/IFkfWgUB1/1sp7733I//kvccSRm8Th5z4nXXsh/An/nPJ3rD0hr7sXNVd2KRqrZTFXAOGfQ/grT9Msi6aHfylHhCT8jfN055FJ4a9GALaLKHyYp7Oy1cbjURfCP+uDufa71fOYItjw8O9ujeqs1hu4CH+OV3n0zA7LIxPCvzf0vzI9GbPwOWHY3YtxKlvQ+An/jA/maul02oR/BhMF6XoaxvjwV9uD8J8IT3ceZRT+lVitODCfsCT8afyEf7RXrvAXpQh/b5rCX30NSPgT/vmEvx305IiVa1z50/iLCH/d3epZhf+yQDM9/JU3W0ncXgj/bMLfhHEDOP5NRfhXw54csvIs4U/jLyT8leffXU34ZzFRkL5ZFk0O/0keEZLwJ/wTeOE8744ALGOeKbiEP15u4e8tv/uW8C/QG3BlbXr4T+qIkIQ/4Z/AW9GT71uO+oMdEf52ROGLhD9eXuHvaQrXPMK/uxPZySdWaRL+xkwURPhz/JvA8K8HnP5vZ+nYFXpNJaLwBuGPR/gP9qxU3eqEP+FfQPhP2URLUxr+cxHh3wlO/icDLyD8TQlXw3fOPMJfprhbPc/w19b+DA9/1V4I/8kI/67ntAn/yZ8iOPz0Xis886/svcCKaCNNwr+YxjX1V/7K88dYn5oR4EoQ/qq9EP4TEv6WS/hPfvhbEXm+4l3agWNucOV21MqEf/aNy3Ndwl95Gu9WJ/yLaS/TFv66e+5ymSKY8J+G8G8MynM7oo04hH9x4S8E4a/rhibjw19tD8J/IsJfLTpHhCT8CX8NnnKG3sAfrgnCv4hw9Vyjw7/rEf4ik25hwn8iwl/niJCEP+GvyVsY5fV7ALwUMwoR/ho8o8NfeYS/Ge2P8J/ocSFyCX/lVWYI/8kO/1het0aSXPVn9WF0VrZaytBYXXd5HBq9Mxke/pM8Aty0hf+0DQedW/j7njTgZKwMnu48Min8U7X8DM9ktFW22nhlaqyqKi0ptc2CNo3hP6kjwE1b+CvPbTUJf2YJLLhnVm8eCcOG10/U+nPqxtBR2aULf2HqzlmS8J/ER8GmMfyVV6bwV0uaESEJf9OPz3rzSBgyt44ssnDCv/d+peHhrzzCfzLCX3O3eh5TBE/DiJCEP+FfRP7KIgsn/NN1W+f5/gj/SQh/32s6hL/J94gQ/oR/Tvk7VsvN6+5FzZVdisZqWcwVQPjnEP7K0zTLounhX8oRIQl/4zzdeWRS+KsRgG2Twl95OitbbTwedSH8sz6Ya5+7IY8pgg0P/+7WqM5qvYGL8Od4Na6nO49MCP/e0P/K9GTMwueEYXcvxqlsQeMn/DM+mKtF5whwhP8+T9fTMMaHv9oehP9EeLrzKKPwr8RqxYH5hCXhT+MvS/jX67Xcwl95c6vqJQp/UYrw96Yp/NPcY0P4E/7jhb8d9OSIlWtc+dP4H6lsmWv4e7KS+PNu3Xp0buGvli1bjihH+CtvtpK4vRD+2YR/d3uM+ZlTh3+oDXD8m4rwr4Y9OWTlWcKfxt9f7KMfnV/4+z/tw49J/HnP/PWn5Bb+xx13lDjyyMPKEf5dT9936iaHf9lGhLRP3Zzrlb/9hM0c/6ZruOBwnndHAJYxzxRcwn+6vfqLXpFb+DtbTxH21scm/rxPeMJJ4rnPe0bm4b9+wzrx6otf3H1fibfHYb+VX/jPrhfi4F9P3F5OWD+fa/ifvP+aVO15/fq1uYa/ag9J97e5t79U2Cc8KvPwt2ozov4nvynsk47k+Dc94b+iJ9+3nO6JYET42xGFLxL+0+3NnPJEMf+GvxALH3qXcB96IJvw99+Ld9pTxNzLX7vUJZr08/7OBeeIE0/cIr75zWvFwsJi4POq3k870Q1mqt5ct9P9lIcffrD4tWf9ilizZnW67XHce4W3/wuEde9X/Lm77vDllqhVrUGPEI0If397tLyVj/qt2iCs/R4vvENf6J/ab0jcXv71mSeJS2+4S3z5f3aJ23Y3RcsdbxdW4S/9Gyatilx2MHD98K/471N95PV+QJ16wFrx6uMPFU/ZtD5Ve/7o/32HuPGGW8Vdd90j9uxZEI7jjty+UTd0qhH+BrWXWq3aDf4tm48UB27ckHh/kxvXiflPvUF0rrtVONvuFF6jFbF9/adN/PdXDU4cpuYOUSMQjmrP/n+XB60TM6dvFVbvRI7j31SEfz3gLF1jLfUEhV5TiSi8QfjjqaX6S08T1dOeLJwdtwlnccEfVKYp7LA3O5tsohH/p7XWD6rVa7V8XvU5H3PiseKExxxj+Pbw/7LhV4Tn/yhvVt0QJqXwNL2/vqfj8+7nh93bnvho8Rclac8zM7bfBrZ0f0qxv/kHOPtxx3R/BnmzHK8I//jeXET4d4KT/9mBF0SFf5Pwz99TrzX2/VUqwjrsKNHxvYrG99fyPYuDER4eHuGvI/znA9dWfa8VnvlXBrr+BeFfTOOy7cqyv7fbTXZOPDw8PMJfl9cMh3+wByC8cjtqZcJ/pffmt71DbL9zR/D6PfHEPt3K8s33/+PHRLvVFguNRdFstkTH/7d2u+N/h+n0hjgdzxPC0/r+8PDw8LL01HG54vc2zszMiFn/a0X11WK9Xher51eJtf59N/uvXy8OP2yTeNxJj+muR/gP9RqD8tyOuPJ3CP/4nu7wV1V2860/5+CBh4c3td4jN2Q6wvEP+A3/Imin2B35mnde8mZxyEEbCf9oTzlDb+APnwAQ/mN669auEQ/v3KW18e/nm4t+o2/6vQAcPPDw8PD8B9lnq2J+leoBWCP237CfOPzQTWLDfvsR/oO9hVFe/wTASzGj0FR/5/+WN75O7Nq5+5G7rRM+Wtb0vUar2T3jnfe7uNQZba3nqTvtmy3/awD/K4B2p9Mtf9iUiX0v8m7wFO8PDw8PLxfPf0x0bm6u2/0/Y9uiqr4GqM2KSozjNeE/ntc9AUhy1Z/Vh9nxYENbZasl6xtK1Bnp/hs2ZHaDSt3/cz3mrFTc4IOHh4enz9MZ/v3IEAaNsJu4zybjRxe0VLbaeDR+PDw8PLwknu48EoYNr5/oBCCnbgwdlU3jx8PDw8NL5enOI2HI3DqyyMIJfzw8PDw8wr+Y/JVFFk744+Hh4eER/vnn71gnAHndvai5smn8eHh4eHiJPN15ZFL4qxGAbZPCX3k6K1ttPBo/Hh4eHl4ST3cemRD+vaH/lenJmIXPCcPuXoxT2UkWGj8eHh4e3oSOG6CcpbGTZYzC66H1CH88PDw8PLzyhb8d9OSIlWtc+dP48fDw8PBKH/7VsGcPWXmW8Kfx4+Hh4eGVOvxlL/z7TndRIwDbMc8UVKELhD8eHh4eHl6pwr/WM/rvSs3946g/2BHhb0cUvkj44+Hh4eHhlSr866Erf/Xb6a8T7gGoRBTeIPzx8PDw8PBKFf5zEeHfCU7+JwMvmMjwb7fbNH48PDw8vLE8NRV7icN/Xqx8eq8VnvlX9l4Q/jhqpeYkXPlfv+1GGj8eHh4e3ljeT356Q5nD34rI8xXvsl8D1qgzhTKGv1o++olP0/jx8PDw8MbygtlR8vBvDMpzGXHl35mU8FfLV//zSvHhj32Sxo+Hh4eHF8v70OUfF1+/8ptlD3/lDL2BP3wToDNJ4d99E34DeOe73ye+f90PxbkveK549JYtYrZapfHj4eHh4S0t6jt/1e2vrvwnIPyVN/LRfasHWEmCP4sPs/nk0zydla174+Hh4eHh4SVZDt9Qq+QU/rE8S6RYsjiT2fFgw6Fx4eHh4eFNmuefAKwVBo2wK5N+kAy7MWhceHh4eHiT6Bk1vH6iE4CcvsOgceHh4eHhTaJnxNw6ssjCCX88PDw8PMK/mPyVRRZO+OPh4eHhEf755+9YJwB5PbpA48LDw8PDm0TPpPBXT//ZJoW/8mhceHh4eHiT6JkQ/r2h/5XpyZiFzwnD7l6kceHh4eHhTbKXUfhXlt5rjMLrYuWsQoQ/Hh4eHh5eucLfDnpyxMo1rvzx8PDw8PBKH/7VsGcPWXmW8MfDw8PDwyt1+Mte+Ped7qKG/7djnimoQhcIfzw8PDw8vFKFf61n9N+V51vdIfftiPC3IwpfJPzx8PDw8PBKFf710JW/+r003064B6ASUXiD8MfDw8PDwytV+M9FhH8nOPOvHXhBVPg3CX88vPJ7Rx5xuDjjl04XJz3meHHMUUeKgzYeKOZXrer+tz1794q777lX3PLz28R1P75efPPq74rt27dTf3h45Q3//sR6bsBrBcNf9AsMDAwge/9mRa2cx4fZfPJpHo0LDy+9NzMzI8581jPEeS94njj+0cfFslzXFY1GQ/z0hhvFZ774JfGVK74hOp0O2wMPT4P3s+uusXIKf6vnuL2fxag8twIv6p8EiHA3QZ5nMuETABoXHt743lOf9KviD193sThs06bYVj/8PW/fG9rxi1+Iv730MnHlt65me+DhpfSCJwA5jLDb/75/4D184XEAvCLDn8aFh5fOq9Xr4p1/9n/Epe/6y9Thb1mWOPboo8Xfv/uvxNvf+seiXq+zPfDwNHg5Da/vihE38IdPABzCHw+vnN4BBxwgPvXhfxBnPfvXxrIGhX+tVhNSPnKI+I0zny0+8aEPiAP235/tgYdnfvgrb+Sj+0v3ACQJ/iw+jPoKgMaFhzd++H/sg+8Xhx+6aSwrTvgHlzu23ylefMFF4r7772d74OGNuRy+oVbJKfxjeZZIsWRxJrPjwYZD48LDi++pbn915b/l2GMyDf/+su3Gn4nzfvtCsei/lu2BhzfWCcBaYdAIuzLpB8n40QUaFx5eTO+tb3pDbuGvlq3HbRZ//AevY3vg4Y3vGTW8fqITgJy+w6Bx4eGN8NTd/ll85z9qed6vP0ec8cunsz3w8JJ5RsytI4ssnPDHw0vuqef83/S61+Qe/v3lj17/WlGpVNgeeHglDP+xTwAIfzw8czw1yM+hmw4pJPzVcph/w+Gznv5UtgceXgnDf6wTgLweXaBx4eHF89QIf0WFf997wdlnsj3w8GJ6JoW/evrPNin8lUfjwsOLN7b/uMP76g5/5R2/9Thx6CGHdEcMZPvi4Q33TAj/wND/nh2z8DmR092L/jgANC48vBGemtin6PDvL7902qniU5//Z7YvXi5exQef4t/8eu45zxWP3nxstz3fetsd4vJP/pP46n9euaxtDlvU6575tCeLFz73bHHc5keeornhpp+JT37mC+KKq74l9k2iV9znzSj8K/0PV4lReF0snyY40+8wNhx86Ftp/Hh4w72Xnfeb/jC9RxUe/sprNFvia/6Bl+2Ll0f4//5FF/o/vys2HniAsG1brPJntTzk4IO696PM+WNiXH3NtbHC/w9//2Lxmgt/Rxx4wP7dm1nVz0EbN4ozn/1MsWpuLpYz7ud94O4dlxQc/rbYN1HQ4HsAeivXhGHPLbIz4eGJ7pS+JoS/8jYfcxTbFy8XT135v8i/8h/Uns9/ybni6U8+Y6SlrvzP+Y2zBu4fcZ2SXflXw54csvIs4Y+HZ6Z30MYDjQh/5R3sXzWxffHy8M4dEv795bde/MKRnur2H7V/xHFKEv4yIs/V/Qgr7wEYcKagCl0g/PHwzPDm/W5PE8K/+17mV7F98XLx+t/5D2vPJ2x99Eiv/53/sP1jlFOi8K/1jP678nyrO+S+HRH+dkThi4Q/Hp7ZXhHhz/bAy9OL0/6G3QQ4jhfnZsIShH894PR/L823E/7UFcIfD898b8/evcaE/549e9m+eLl46m7/Ue35Jz+9YaSn7vYftX8MckoU/lFP73WCM//KwAuiwr9B+OPhmefdfc+9xlz5/88997B98XLx1KN+o5aPfuLTIz31qN+o/SPKKVH4z4cu8JXXCob/0glAr+tfhFZuEv54eGZ6t/z8NiPCXy0333ob2xcvF0895//hj31y4Gs/dPnHxdev/OZITz3nPyzgo5yShb8Vkecr3mV3HICjjjpC9l7Qf1E7auU8Pkx4HAAaPx7eymXjgQd2B+Ax4Tv/f/r8l/zu0m1sX7xcPPV8/k0339IdB2DD+vWi0+mI6358vfiLv363+MQ/fS62N46j6/MGxwHIKfyV0xiU51bghf0TAKeo8FeLPxKgR+PHwxu+HPGow8UXPv5hI274e/pZ54g777qL7YuHN2L52XXXWDmGv7rZb+jTe+E9u9Dwp3Hh4cVbtm/fLn56w42Fh/8Pf3I94Y+HV2BeDvFGPrrf37u7zwUaEv4ejQsPb7T3mS9+qdDwV8snPvN5tgceXszdLc+J9eJ43T08SfBndSYjPa9J48LDG+195YpvdGfhKyr8f377HeLLX7mC7YGHF2uHEw2Twj/YA2BMN4Yn5E4aFx7eaE/dtPS3l15W2CA/6mYpx3HYHnh4cRbL2ykMG14/0QlAlt0YlnTvoXHh4cXzrvzW1eKL//rl3MP/M1/4kvj2d7/H9sDDi+tZ8m6Twj/RCUDW32FYwtpO48LDi+/96TveJbbd+LPcwv/6bTd0r/7ZHnh48T1/99puUviPfQKQyw0MlriJxoWHF99bXFwUv/va/y3u2H5n5uF/+x3bxYW/9wbRaDbZHnh443k3CdNm1TUq/H3Pcb3v0rjw8Mbz7rv/fvHiCy4a2BOg68r/xRe8Stz/wINsDzy8Mb2K8K4zKfzVCMCWSeGvvB0P7troetVf0Ljw8Mb36n6g//EfvE4879efozX81Xf+qtufK388vGSeJ+yDbvrBt+8Z18ogf63exb9nxSx8TvSGDc4y/PuePxrg9f6v42lceHjJvDN++XTxR69/rTjs0E2pH/VTwc8Nf3h4qbwf+aMAPtaQ8K/0DM+OUXhdrJxVKONuDO9f/FWOp3Hh4SXzrvr2d7qh/aynP1W84OwzxfFbjxsr/NUIf2qQH/WcP4/64eGl8/z//xdDwt8OOMIasXI//PtzBeRyA8Pmk59wor/aj2hceHh6vEMPOaQ7edApJz9WbD7mKHHwxo1ifn5V97/t2bO3O6WvmtXvuh/9RHzz6u8yvC8enkbPcZ0Tbv3Rf/204PCv9q/8xSOTBLnWkJVne10FVqAHILcbGI496bT/tqR4HI0LDw8PD6+0nie+97MfXnNageEve+EvesHfPQFQw//LIWcK4SkF87170RLvpXHh4eHh4ZXZs7zBWZZT+NfCngp/IUKPAQa+Ixh7ViHdH2amtetT/pp30rjw8PDw8Mro+SF327zd/kyB4V+P8JZu6gn3AFQiVl4s4rnFbdu2tfxfl9C48PDw8PDK6PlX/5d8//vfbxcU/nMRXic4+Z8MvCAq/BtFDlrws2MP+6hfpdfRuPDw8PDwyuR5rvj+zT+85mMFhf+8WPn0Xis886/svSD8cdRKzcJHLPrsZx1LVF7pV7ZL48LDw8PDK4Xnuo5bEa8QQrgFhb8VkecrPnX/DMEadaaQe/j3vMM2zN7gP7z81zQuPDw8PLxSeJb801t/cM0PDAn/xqA8lxFX/h1Twr/vbVo3+05PWN+iceHh4eHhme25V/hfX/+5AeGvnKH38IVPABzTwr97MmWJzuq69VK/U+UWGhceHh4enome/0832035m+rrawOu/Ec+vbc0LGCKGYVy+TDr6tXtu3Z3nuFXu98TIDfRWPHw8PDwjPH8x9Zty3r6tm3ffdCA8I/lWSLFUsSHOeaU04/2b6+8wl/xCBorHh4eHl7hnuveagnraTf96Hu3lyX8u5+vTOGvllt+8J1bnbZ3mv/txjU0Vjw8PDy8Ij1XuFe7VvWJZQt/tVTKFP795eF779q73+oTPi6qi/P+7Gan0Vjx8PDw8Arw3jXT3P3Sm37y/d1lC38hEnwFYNqH2XLSE57kz2jw91JYW2iseHh4eHg5eNs8y73w5h9c+60y5eWKz1rm8FeL3+1y5VrZeYzwvFepmzBorHh4eHh4mXiut93/64UHr5k9qezhP1YPgOkfRnmdjrPu/t3t53SEdZ7reE+WUszQ+PHw8PDwknp+GLWk533Vs8RHDllT+5errrqqU/a87JmWVUTheXgPLTZX7110H+e44nS/d+BEIeXRlis2+ptzlf/nCo0fDw8PD2/Jcz3/2X254Elxr/+k2W2uZ/1AWt7Vzox35S3XXrtrgi6WlaNMz4pZuJpVqFKW8MfDw8PDw8OLDP9Kz/BkjMLrYuWsQlQ2Hh4eHh5eucLfDnpyxMo1KhsPDw8PD6/04V8Ne/aQlWepbDw8PDw8vNJ71YDTXdS8P3bMMwVV6AKVjYeHh4eHVyqv1jP64a/m/ulOVmRHhL8dUfgilY2Hh4eHh1cqrx668le/l2YqDPcAVCIKb1DZeHh4eHh4pfLmIsK/o7r+V5wA+C+ICv8mlY2Hh4eHh1c6Ty1uwGsFw3/pBKDX9S9Cha9YmcrGw8PDw8MrheeFLuZX5Hm/ByBceJvwx8PDw8PDK73XGJTndsSVv0P44+Hh4eHhldpTztAb+MMDARH+eHh4eHh45fdGPrrf7wHwUswoRGXj4eHh4eGVzLNEioXKxsPDw8PDK6eX+ASAysbDG8874FFbH7akTHzC7bmuCIzk2aUn0fvkB99n0V7w8LL3Eu3tVDYe3vge4U97wcMzyZNUDh5ePh7hH3uhveDh5eBJKgcPz0xvGsP/EY/2goeXx/FFUjl4eIS/mR7tBQ8vq+OLGgHYpnLw8Ah/wh8Pb2o8q3fx78mYhc9R2Xh4hD/hj4dX+vCv9P8uYxReD61HZePhEf6ZebQXPLzMwt8OenLEyjUqGw+P8M/To73g4WUS/tWwZw9ZeZbKxsMj/E33aH94eCO9asDpLmreHzvmmYIqdIHKxsMj/Al/PLxSebWe0d/p1Nw/jvqDHRH+dkThi1Q2Hh7hT/jj4ZXKq4eu/NVvp79OuAegElF4g8rGwyP8CX88vFJ5cxHh31Fd/ytOAPwXRIV/k8rGwyP8CX88vNJ5anEDXisY/ksnAL2ufxEqfMXKVDYeHuFP+OPhlcLzQhfzK/LcXtojlxfeJvzx8Ah/wh8Pr/ReY1Ce2xFX/g7hj4en3yP8CX88vBw95Qy9gT+8NxL+eHiZeYQ/4Y+Hl5s38tH9fg+Al2JGISobD28sj/CnveDhFe9198okV/1UNh4e4U/44+GV10u8p1PZeHiEP+GPh1deT7Jz4uHl4xH+tBc8PJM8SeXg4eXjEf6xF9oLHl4OnqRy8PAYN8Asj/aCh5fH8UVSOXh4hL+ZHu0FDy+r44saAdimcvDwCH/CHw9vajyrd/HvyZiFz1HZeHiEP+GPh1f68K/0/y5jFF4PrUdl4+ER/pl5tBc8vMzC3w56csTKNSobD4/wz9OjveDhZRL+1bBnD1l5lsrGwyP8Tfdof3h4I71qwOkuagRgO+aZgip0gcrGwyP8CX88vFJ5tZ7R3+nU3D+O+oMdEf52ROGLVDYeHuFP+OPhlcqrh6781W+nv064B6ASUXiDysbDI/wJfzy8UnlzEeHfCU7+ZwdeEBX+TSobD4/wJ/zx8ErnqcUNeK3wzL927wVWeH+NWpnKxsMj/Al/PLxSeF7oYn5FnttLe+TywtuEPx4e4U/44+GV3msMynM74srfIfzx8PR7hD/hj4eXo6ecoTfwh/dGwh8PLzOP8Cf88fBy80Y+ut/vAfBSzChEZePhjeUR/rQXPLzive5emeSqn8rGwyP8CX88vPJ6ifd0KhsPj/An/PHwyutJdk48vHw8wp/2godnkiepHDy8fDzCP/ZCe8HDy8GTVA4eHuMGmOXRXvDw8ji+SCoHD4/wN9OjveDhZXV8USMA21QOHh7hT/jj4U2NZ/Uu/j0Zs/A5KhsPj/An/PHwSh/+lf7fZYzC66H1qGw8vDG95//2768n/ON5+x95zAztDw8vk/C3g54csXKNysbDS+/NysbRhH88T3pzR9D+8PC0h3817MkhK89S2Xh4ejzHrWwh/GN6lrOF9oeHp9UL53l3BGA75pmCKnSBysbDS+b52XYC4R/P8zzrBNofHp42r9Yz+judmvvH6R6XIsLfFglmFaKy8fCGhJ7nnUz4x/P8yj2Z9oeHp8WrR3jO0oVJ6DWViJUXqWw8vOTeW97yFulZ3qmEf0zPck9VdUb7w8NL5UU9vdcJTv4nAy+ICv8GlY2Hl8679c6Htvq3tq0j/ON6cv1Nd933aNofHl4qL/z0Xis886/svcAK76/+T5PKxsNL7zkV56mE/7ie9RTaHx6eNq8ZDv9gD4A16kyBysbDS+b5cfcswn88z/K8Z9H+8PC0eI1BeS4jrvw7hD8enh7vvIsvXiNc90mE/3ieX+lPOf/8N6ym/eHhJfaUM/QevvDe6BD+eHj6PGfBO8t/BnCW8B/T8+usUVk4k/aHh5fYG/n0Xn8cAC/FjEJUNh7eoCtZy32p5wrCP5FnvdTfHp+m/eHhZeNZIsVCZePhDV7OO/+VR7uWdbNPWIR/Mq69d/dJD917x3baHx6efi/xnkll4+EN9zqe+1rCP5VnydnaBbQ/PLxsvEQ9AFQ2Ht5wb37/Aw+t1zds80+xVxH+yT1XeHsaex44Ye8D9z1E+8PD0+tJKgcPT79Xq+13MeGf3pPCmq/PrX8V7Q8PT78nqRw8PL3eugMP2uQn4EWEvx5P2JWL9j/8+INof3h4+ryxTgCobDy8eJ5dW/tWS6pJOAh/HZ7/f6tkRbyT9oeHpy/81QjAFpWDh6fPW3foUU+bqcx+jvDX7/kzKv7apz506Vdof3h4qTyrd/HvWTELV7MKVahsPLzB3uoDNq6vza3/jv/Hgwh//Z4/nsJdbTFz4uf+8W8fpP3h4SUO/0rP8OJMuVkXK2cVorLx8AJetTrrP7G27gOEf3ae/7XKJlu2Lx80VTDtGQ9vZPjbQU+OWLlGZePhjfZWb3zUmyxZeSZhna3n/9fn3HzX/W+l/eHhjR3+1bBXGbLybO8EwQq8iMrGwwt56zcde16lMvPnhHVOnmWdccLJj99+/XX/9UPaHx5eLG+25/V3uu7w/9aQMwUZOAFQywKVjYcXCv9Dj3meZdkfrNh28vFuCf+xPddf/KcDzr33jus/S3vGwxvq1XqG+lGG61udXo/aivC3RYJZhahsvGm88if8i/Gkv7jC/eT+hx37CtozHt5Arx7hOUv7Ueg1lYiVF6lsPLx9XqfTsTYctvmNFXvmUsK/OM/fsNKS9gc2HLblD9Q2oT3j4S3z5iK8ju95gX1o6QUVsa/Lv79XtqhsPLx9Xm3d+jVzaw64tGJVziSszfH8RwS/1LYaL//8hz/yEO0ZD6/rqcUNXPU3g+G/dAIQGBggeNNfK7wylY03zd76g48+3b/q/3u///lwwtpAz/Vu9yreSz512fu/TXvGw9v3nb94pCffi+hFW3pR8Mq/Q/jj4T3irV69cd3sunVv9kPmAnULOmFttOf5QwZe2pbtP/7sZZftpD3jTbHXv/If+DV++ARA/TiEPx7ek2S9PreuvuHQl1Yq1pv9c+P9CdfyeP6q90rL+5N52f7IZZdd1qY9402hp8J/6A384RMAl/DHm3bv7LNf48/m2zzfk/L1PnwU4Vpez3/VLRVhvb318PqPf/azl7TYP/DwVp4AWEmCn8rGmyTvhedfdIglvQtcx71QSusgwnVyPNf1/seS1gecducjD+64cRf7Bx7e8hcR/nhT55138cVrnAXvLEu45/ovfKbVvQ+GcJ1Uz+l0XH8O1CucjvP5VvPhL+994L5d7B940+olPgGgsvFK6lkvPv81xzsV56n+2s+2LO9JfuZXCddp9LyWD17l39f5//yphq/49Ifevy20Avsb3kR7iU4AqGy8snjnvOpVB1U64rGWK0/x13iCJd0n+oF/AGGIF/bUjYN+g7rG/xroGtfyrnNs8cPPvv/9d7O/4U2qZ1E5eJo969xXvPr5nude7An5eB+rETZ4eMk8/780/P90rX8j43s/8aH3fn5UDwXHK7zMTgCobLxhy8te9rJa2179cf9b9OdxMMfD0+v5Axx8rtra85LLL7+8wfEKL62nFpvKwdN15U/44+Fl5/n/9fmtaneE1xeEewI4XuElMC2LysHT4fnd/uf4r/gMB3M8vGw9vyfg+Z/64KWf53iFl9Drj/rryZiFz1HZeEMPSv53/hzM8fCy9yxXXMzxCi9F+Ff6f5cxCq+H1qOy8SKuSuTjOZjj4eXheadyvMJLGP520JMjVq5R2XgcfPHwzPI4XuElCP9q2JNDVp6lsvHiep7jfJ+DOR5e9p4/R8W1HK/wxvTCeS7U8P8y5pmCS2XjDfUc5zIO5nh42XtOu/khjld4Y3grevJ9S80UuPwrgKjvCHqFL1DZeMO8e+7Y9i+u536JgzkeXnae23H++d7bb/g3jld4Mb16hOf0/xJuiZWIlRepbLxRnm3b3uL9Oy7wW9TnOZjj4WUT/nvvv+NCta9xvMKL4UU9vdcJzvwrAy+ICv8GlY0X11tY2PvApz74/nPUc8rC9a7yB1df5GCOh5fC8/chX7mq026+5O7bfvLyxcWFBscrvJhe+Om9VjD8Rb/AwMAAsvdvVtTKVDYeHh4eHl4pPOW4vZ/FqDy3gycCgcLbhD8eHh4eHl7pvcagPA/PBdC9QYDwx8PDw8PDK7XXv/If6IW/lCL88fDw8PDwyu+NfHqv3wPgpZhRiMrGw8PDw8MrmWeJFAuVjYeHh4eHV04v8QkAlY2Hh4eHh1deL9EJAJWNh4eHh4dXbs+icvDw8PDw8KbPs6gcPDw8PDy86ZvC3aJy8PDw8PDwpiv81QjAFpWDh4eHh4c3NV5/6H9Pxix8jsrGw8PDw8MrffhX+n+XMQqvi5WzClHZeHh4eHh45Qp/O+jJESvXqGw8PDw8PLzSh3817NlDVp6lsvHw8PDw8ErvVQNOd1Hz/tgxzxRUoQtUNh4eHh4eXqm8Ws/oh7+a+8dRf7Ajwt+OKHyRysbDw8PDwyuVVw9d+avfTn+dcA9AJaLwBpWNh4eHh4dXKm8uIvw7qut/xQmA/4Ko8G9S2Xh4eHh4eKXz1OIGvFYw/JdOAHpd/yJU+IqVqWw8PDw8PLxSeF7oYn5Fnvd7AMKFtwl/PDw8PDy80nuNQXluR1z5O4Q/Hh4eHh5eqT3lDL2BPzwQEOGPh4eHh4dXfm/ko/v9HgAvxYxCVDYeHh4eHl7JPEukWKhsPDw8PDy8cnqJTwCobDw8PDw8vPJ6dorwDw8ykHa4YDw8PDw8PLycPCth4XWhd7hgPDw8PDw8vBw9K0HhUVMEN1JOVICHh4eHh4eXkzfWCcCQKYKbCR8dxMPDw8PDw8vZ65vWGIVXIwpvpfgweHh4eHh4ePl7qjfBs2KuHDVFcCdF4Xh4eHh4eHj5e5We4VVirhwu3ElZOB4eHh4eHl4xXvf1ox4DlP0zhf4/+AU7IvmCh4eHh4eHV7w3uAcgaorgpHca4uHh4eHh4Rnlef8fGWPh6umYx5MAAAAASUVORK5CYII=';
    if (this.state.response === null) {
      resp = defaultResp;
    } else {
      resp = this.state.response.base64;
    }
    const {userId} = await this.props.SignInReducer;
    try {
      await this.props.PostAdd(
        userId,
        description,
        resp,
        category,
        province,
        district,
      );
      const {data, error} = await this.props.PostAddReducer;
      if (data !== null && data !== undefined) {
        ToastAndroid.show(
          'Gönderi başarıyla eklendi.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        resetForm();
      }
      if (error) {
        this.errorRender(error);
      }
      this.setState({loadingButton: false});
    } catch (error) {
      this.setState({loadingButton: false});
    }
  };
  errorRender = (error) => {
    this.setState({
      errors: error,
    });
  };
  render() {
    const {loadingButton} = this.state;
    return (
      <SafeStatusView
        statusBackColor={'#456BFF'}
        statusBarStyle={'white'}
        safeStyle={{backgroundColor: '#FFFFFF'}}
        content={
          <KeyboardAwareScrollView style={styles.container}>
            <HomeHeader
              name="note-plus"
              color="#fff"
              headerText={'GÖNDERİ EKLE'}
              iconSize={34}
            />
            <Formik
              validateOnMount={true}
              validationSchema={PostAddValidation}
              initialValues={{
                province: '',
                category: '',
                description: '',
              }}
              onSubmit={this._handleSubmit}>
              {({handleSubmit, isValid, errors, setFieldValue, values}) => (
                <>
                  <View style={styles.imageSelectStyle}>
                    <ImageBackground
                      source={
                        !this.state.response
                          ? require('../../assets/denemeprofil.jpg')
                          : {uri: this.state.response.uri}
                      }
                      style={styles.imageStyle1}>
                      <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => {
                          ImagePicker.launchImageLibrary(
                            {
                              mediaType: 'photo',
                              includeBase64: true,
                              maxHeight: 500,
                              maxWidth: 500,
                            },
                            (response) => {
                              this.setState({response: response});
                            },
                          );
                        }}>
                        {!this.state.response ? (
                          <Text style={styles.nameText}>Fotoğraf Seç</Text>
                        ) : (
                          <Text style={styles.nameText}>Fotoğraf Seçildi</Text>
                        )}
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  <View style={[styles.inputViewStyle]}>
                    <RNPickerSelect
                      name="category"
                      placeholder={categoryPlaceHolder}
                      items={categoryList}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('category', itemValue);
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        placeholder: {
                          color: '#8E9092',
                          fontSize: 14,
                          fontFamily: 'Roboto',
                        },
                      }}
                      value={values.category}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{underlineColor: 'yellow'}}
                      Icon={() => {
                        return (
                          <Ionicons
                            name="md-arrow-down"
                            size={24}
                            color="gray"
                          />
                        );
                      }}
                    />
                    {errors.category && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.category}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.inputViewStyle]}>
                    <RNPickerSelect
                      name="province"
                      placeholder={provincePlaceHolder}
                      items={provinceList}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('province', itemValue);
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        placeholder: {
                          color: '#8E9092',
                          fontSize: 14,
                          fontFamily: 'Roboto',
                        },
                      }}
                      value={values.province}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{underlineColor: 'yellow'}}
                      Icon={() => {
                        return (
                          <Ionicons
                            name="md-arrow-down"
                            size={24}
                            color="gray"
                          />
                        );
                      }}
                    />
                    {errors.province && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.province}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.inputViewStyle, styles.textArea]}>
                    <Field
                      component={CustomLoginInput}
                      name="description"
                      placeholder="Açıklama"
                      placeholderTextColor="#8E9092"
                      inputExtraStyle={[
                        styles.inputExtraStyle,
                        styles.textArea1,
                      ]}
                      maxLength={100}
                      numberOfLines={5}
                      multiline={true}
                    />
                  </View>
                  <View style={styles.inputViewStyle}>
                    {loadingButton ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.SaveButton,
                          !isValid ? null : {backgroundColor: '#456BFF'},
                        ]}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.ButtonText}>KAYDET</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  imageSelectStyle: {
    height: calcHeight(25),
    width: calcWidth(100),
    marginBottom: calcHeight(3),
  },
  imageStyle1: {
    width: '100%',
    height: '100%',
  },
  settingsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    color: '#fff',
    fontSize: (calcWidth(3) + calcHeight(3)) / 2,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textArea: {height: calcHeight(100) / 6},
  textArea1: {height: calcHeight(100) / 7, textAlignVertical: 'top'},
  ActiveButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 16,
    justifyContent: 'center',
    elevation: 24,
  },
  ActiveButtonText: {paddingLeft: 20, color: '#8E9092'},
  container: {flex: 1, backgroundColor: '#EAEAEA'},
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  inputViewStyle: {
    width: calcWidth(100),
    height: calcHeight(7.5),
    alignItems: 'center',
  },
  SaveButton: {
    backgroundColor: '#707070',
    borderRadius: 5,
    height: calcHeight(100) / 19,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  ButtonText: {
    fontSize: (calcWidth(2.2) + calcHeight(2.2)) / 2,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputExtraStyle: {
    height: calcHeight(100) / 19,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    width: calcWidth(100) - 60,
    height: calcHeight(100) / 19,
    paddingLeft: 20,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    fontFamily: 'Roboto',
  },
});
const mapStateToProps = (state) => {
  return {
    PostAddReducer: state.PostAddReducer,
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  PostAdd,
};

PostScreen = connect(mapStateToProps, mapDispatchToProps)(PostScreen);
export default PostScreen;
