
export default function CreateUsers({ createModal, setCreateModal }){
    const [createForm, setCreateForm] = useState({
        username: "",
        password: ""
    })


    const createUser = async (e) => {
        e.preventDefault();
        const body = { ...createForm };
        try {
            const response = await fetch('https://worldwide-radio-database.herokuapp.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(body, {token: window.localStorage.getItem("token")})
            });
        } catch (error) {
            console.log(error);
        }
        setCreateForm({
            username: "",
            password: ""
        })
        setCreateModal(false)
    }

    const createChange = (e) => {
        setCreateForm({
          ...createForm, [e.target.id]: e.target.value
        })

      }
}