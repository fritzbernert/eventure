module.exports = {
    generate: function(data){
        var result = 
        `
        <style>
            a{
                color: #393E46;
                text-decoration: none;
            }
            a:hover{
                color: #1e2024;
                text-decoration: none;
            }
            .contentBox{
                background-color: #EEEEEE;
                height: 100px;
                width: 70%;
                margin: 20px 0;
                padding: 20px;
                border-radius: 5px;

                
            }
        </style>
        <h1>Newest Additions to Eventure:</h1>
        `;
        for (const item of data) {
            result += 
            `<a href='https://e-venture.herokuapp.com/item/${item.name}'>
                <div class='contentBox'>
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                    </div>

                </div>
            </a>`
        }

        result +=  
        `<footer>
            <span>© Eventure 2021</span>
            <a href='https://e-venture.herokuapp.com/unsubscribe'>Unsubscribe</a>

        </footer>`

        return result;
            

    },
    generatePlainText: function(){
      return `
          Hi!
          Here we have the plaintext version that will be sent along the HTML version for a fallback.
      `
    }
}