        var limit = 3;
        var current = 1;

        window.addEventListener('load', function(){
            var formEle = document.getElementById('form');
            var pageBtn = document.getElementById('pagination');
            formEle.addEventListener('submit', addProduct);
            pageBtn.addEventListener('click', pageControl);
            
        });

        function pageControl(e){
            e.preventDefault();
            const prev = document.getElementById('prev');
            const curr = document.getElementById('current');
            const next = document.getElementById('next');
            console.log(e.target);

            if(curr.value == 1){
                prev.disabled = true;
            }
        }

        async function addProduct(){
            try{
                event.preventDefault();
                let form = document.getElementById('form')
                var details = new FormData(form);
                var name = details.get('name');
                var price = details.get('price');
                var currency = details.get('currency');
                var quality = details.get('available_qty');

                const createProd = await postProduct({name, price, currency, quality});
                console.log(createProd);
                fetchProduct();
            }
            catch(e){

            }
            


        }

        function postProduct(data){
            var config = {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            return fetch("http://localhost:3001/products", config)
            .then(function(res){
                return res.json();
            })
        }
        function getProducts(){
            return fetch(`http://localhost:3001/products?_page=${current}?limit=${limit}`).then(function(response){
                return response.json();
            })
        }

        function displayProduct(data){
            var display = document.getElementById('display');
            display.innerHTML = "";

            for(let prod of data){
                const div = document.createElement('div');
                div.setAttribute('class', 'prodDiv');
                
                const h3 = document.createElement('h3');
                h3.textContent = `Name: ${prod.name}`;

                const h4 = document.createElement('h4');
                h4.textContent = `Price: ${prod.price}`;

                const p = document.createElement('p');
                p.textContent = `Currency: ${prod.currency}`;

                const p1 = document.createElement('p');
                p1.textContent = `Quantity: ${prod.available_qty}`;

                div.append(h3, h4, p, p1);
                display.append(div);

                // var prev = document.getElementById('prev');
                // var next = document.getElementById('next');
                // if(next.textContent == 1){
                //     prev.disabled = true;
                // }
               
            }

        }
        async function fetchProduct(){
            try{
                const products =  await getProducts();
                console.log(products);

                displayProduct(products);
            }
            catch(e){

            }
            
        }

        fetchProduct();