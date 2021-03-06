var builder = require('botbuilder');

module.exports = function(session){
	console.log("Entre a empezar!");
	let message = getHelpCards();
	session.endDialog(message);
};


function getHelpCards(){
	return new builder.Message()
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments([
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo ser Asesora MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/asesora.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo ser Asesora MP?",
                    "value":"¿Cómo ser Asesora MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo compro productos MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/ropa.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo compro productos MP?",
                    "value":"¿Cómo compro productos MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo comprar productos de campañas anteriores?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/ropa2.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo comprar productos de campañas anteriores?",
                    "value":"¿Cómo comprar productos de campañas anteriores?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo puedo ver los catálogos de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/catalogo.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo puedo ver los catálogos de MP?",
                    "value":"¿Cómo puedo ver los catálogos de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo consulto los términos y condiciones de los concursos de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/condiciones.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo consulto los términos y condiciones de los concursos de MP?",
                    "value":"¿Cómo consulto los términos y condiciones de los concursos de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo puedo leer los artículos del blog de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/blog.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo puedo leer los artículos del blog de MP?",
                    "value":"¿Cómo puedo leer los artículos del blog de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cuál es el teléfono de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/telefono.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cuál es el teléfono de MP?",
                    "value":"¿Cuál es el teléfono de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo cambio productos de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/garantia.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo cambio productos de MP?",
                    "value":"¿Cómo cambio productos de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cuánto gano por vender MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/pesos.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cuánto gano por vender MP?",
                    "value":"¿Cuánto gano por vender MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "¿Cómo hago mi pedido en el sitio Web de MP?",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/carrito.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "¿Cómo hago mi pedido en el sitio Web de MP?",
                    "value":"¿Cómo hago mi pedido en el sitio Web de MP?"
                  }
                ]
            }
        },
        {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "Realizar encuesta",
                "subtitle": '',
                "images": [
                  {
                    "url": "http://mpbot2.azurewebsites.net/images/encuesta.jpg"
                  }
                ],
                "buttons": [
                  {
                    "type": "postBack",
                    "title": "Realizar encuesta",
                    "value":"realizar encuesta"
                  }
                ]
            }
        }
    ]);
}