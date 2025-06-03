import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { Options } from 'unplugin-vue-components/types'

const components: Options = {
  resolvers: [ElementPlusResolver()], // меняем резолвер на Element Plus
  deep: true,                         // рекурсивный поиск компонентов в папках
}

export default components
