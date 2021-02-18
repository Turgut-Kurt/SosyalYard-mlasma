import {combineReducers} from 'redux';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import WorkerAdd from './Workers/WorkerAdd';
import GetAllWorkers from './Workers/GetAllWorkers';
import GetWorker from './Workers/GetWorker';
import WorkerUpdate from './Workers/WorkerUpdate';
import WorkerDelete from './Workers/WorkerDelete';
import GetAllUsers from './Users/GetAllUsers';
import PostAdd from './Post/PostAdd';
import GetAllPosts from './Post/GetAllPosts';
import LikeAdd from './Like/LikeAdd';
import GetPostFilters from './Post/GetPostFilters';
export default combineReducers({
  GetPostFiltersReducer: GetPostFilters,
  LikeAddReducer: LikeAdd,
  SignInReducer: SignIn,
  SignUpReducer: SignUp,
  WorkerAddReducer: WorkerAdd,
  GetAllWorkersReducer: GetAllWorkers,
  GetWorkerReducer: GetWorker,
  WorkerUpdateReducer: WorkerUpdate,
  WorkerDeleteReducer: WorkerDelete,
  GetAllUsersReducer: GetAllUsers,
  PostAddReducer: PostAdd,
  GetAllPostsReducer: GetAllPosts,
});
