import React from 'react';
import {Route,HashRouter,Redirect} from 'react-router-dom';
// import Admin from './pages/admin'
import Login from './pages/login'
import User from './components/user';
import Administrators from './components/Administrators';
// import GoodsList from './components/Goods/GoodsList';
import GoodsAdd from './components/Goods/GoodsAdd';
import GoodsEdit from './components/Goods/GoodsEdit';
import loadable from './utils/loadable';  //引入懒加载高阶组件
const GoodsList = loadable(()=>import('./components/Goods/GoodsList'))
const Admin = loadable(()=>import('./pages/admin'))
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Redirect from='/' to='/admin' exact></Redirect>
        <Route path='/login' exact  component={Login}></Route>
        <Route path='/admin'  render={()=>{
          return (
            <Admin>
              {/* <Link to='/admin/user' >用户</Link>
              <Link to='/admin/product' >产品</Link> */}
              <Route path='/admin/administrators'  component={Administrators}></Route>
              <Route path='/admin/user'  component={User}></Route>
              <Route path='/admin/goodslist'  component={GoodsList}></Route>
              <Route path='/admin/goodsadd'  component={GoodsAdd}></Route>
              <Route path='/admin/goodsedit'  component={GoodsEdit}></Route>
            </Admin>
          )

        }
        }></Route>

      </HashRouter>
    </div>
  );
}

export default App;
