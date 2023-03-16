import {useState} from 'react';
	import { Header } from "../../components/Header";
	import background from '../../assets/bg2.jpg';
	import { ItemList } from '../../components/ItemList'
	import './style.css';
	

	function App() {
	  const [user, setUser] = useState('');
	  const [currentUser, setCurrentUser] = useState(null);
	  const [repos, setRepos] = useState(null);
	  
	  const handleGetData = async () => {
	  const userData = await fetch (`https://api.github.com/users/${user}`);
	  const newUser = await userData.json();
	  
	    if(newUser){
	      const {avatar_url, name, bio, login} = newUser;
	      setCurrentUser({avatar_url, name, bio, login});
	    }
	

	    const reposData = await fetch (`https://api.github.com/users/${user}/repos`);
	    const newRepos = await reposData.json();
	

	    if(newRepos.length){
	      setRepos(newRepos);
	    }
	

	  }
	  return (
	    <div className="App">
	      <Header />
	      <div className="conteudo">
	        <img src={background} className="background" alt="background" />
	        <div className="info">
	          <div>
	            <input 
	            name='usuario'
	            value={user} 
	            onChange={event=> setUser(event.target.value)} 
	            placeholder="@username"
	             />
	            <button onClick={handleGetData }>Buscar</button>
	          </div>
	          {currentUser?.name?  (<>
	            <div className="perfil">
	            <img src={currentUser.avatar_url} className="profile" alt="nome de perfil"/>
	            <div>
	              <h3>{currentUser.name}</h3>
	              <span>{currentUser.login}</span>
	              <p>{currentUser.bio}</p>
	            </div>
	          </div>
	          <hr/>
	          </>
	          ) :
	           <div>
	              <h3 className='usuario-inex'>Usuário não existe</h3>
	            </div>}
	          {repos?.length ? (
	            <div>
	            <h4 className="repositorio">Repositórios</h4>
	            {repos.map((repo) => (
	              <ItemList title={repo.name} description={repo.description}/>
	            ))}
	          </div>
	          ) : <div>
	              <h3> ERROR 404</h3>
	             </div>}
	          
	        </div>
	      </div>
	    </div>
	  );
	}
	

	export default App;