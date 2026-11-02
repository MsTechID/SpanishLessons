/* ============================================================ TRIP CONTENT ============================================================ */
function P(es, en, opts={}){ return {es, en, ...opts}; }

/* ---------- Phrasebook, by category ---------- */
const CATS = [
  { id:"esencial", chip:"Must-knows", es:"Lo esencial", en:"The must-knows — if you learn nothing else", blocks:[
    { items:[
      P("Hola","Hi / Hello"), P("Buen día","Good morning"),
      P("Por favor","Please"), P("Gracias","Thank you"), P("Perdón","Excuse me / Sorry"),
      P("¿Cuánto sale?","How much is it?",{note:"“sale”, not “cuesta”"}),
      P("¿Dónde queda el baño?","Where’s the bathroom?"),
      P("No entiendo","I don’t understand"),
      P("¿Hablás inglés?","Do you speak English?"),
      P("Más despacio, por favor","Slower, please"),
      P("La cuenta, por favor","The check, please"),
      P("¿Puedo pagar con tarjeta?","Can I pay by card?"),
      P("Ta","OK / got it / deal",{note:"You’ll hear this constantly"}),
      P("Chau","Bye"),
    ]},
    { type:"aside", cls:"warm", h:"Tip: tap, then “Mostrar”", body:[
      "Tap any phrase to hear it. In the player, <b>Mostrar en grande</b> fills the screen with the phrase so you can just turn your phone around and show it."
    ]},
  ]},

  { id:"saludos", chip:"Greetings & small talk", es:"Saludos y charla", en:"Greetings & small talk", blocks:[
    { h:"Saludos", en:"Greetings", items:[
      P("Hola","Hi / Hello"), P("Buen día","Good morning"), P("Buenas tardes","Good afternoon"),
      P("Buenas noches","Good evening / night"),
      P("¿Cómo andás?","How’s it going?",{note:"Used even with strangers"}),
      P("Todo bien, ¿y vos?","All good, and you?"),
      P("Disculpá","Excuse me (to get attention)"),
      P("Con permiso","Excuse me (squeezing past)"),
      P("De nada","You’re welcome"),
      P("Hasta mañana","See you tomorrow"), P("Nos vemos","See you"), P("Chau","Bye"),
    ]},
    { h:"Charla", en:"Small talk", items:[
      P("Me llamo…","My name is…",{say:"Me llamo"}), P("Mucho gusto","Nice to meet you"),
      P("¿Y vos, cómo te llamás?","And you, what’s your name?"),
      P("¿De dónde sos?","Where are you from?"),
      P("Soy de Estados Unidos","I’m from the United States"),
      P("Vivo cerca de Chicago","I live near Chicago"),
      P("Vivo cerca de San Luis","I live near St. Louis"),
      P("Estamos de vacaciones","We’re on vacation"),
      P("Es mi primera vez en Uruguay","It’s my first time in Uruguay"),
      P("¡Qué lindo!","How nice! / How pretty!"),
      P("Me encanta Piriápolis","I love Piriápolis"),
    ]},
  ]},

  { id:"supervivencia", chip:"When you don’t understand", es:"Cuando no entendés", en:"When you’re lost in the conversation", blocks:[
    { items:[
      P("No entiendo","I don’t understand",{note:"You caught nothing. Full reset."}),
      P("Más despacio, por favor","Slower, please",{note:"You caught some words"}),
      P("¿Podés repetir?","Can you repeat that?",{note:"You almost had it"}),
      P("¿Hablás inglés?","Do you speak English?"),
      P("Hablo un poco de español","I speak a little Spanish"),
      P("¿Me lo podés escribir?","Can you write it down for me?",{note:"Then type it into the search box above"}),
      P("¿Cómo se dice…?","How do you say…?",{say:"¿Cómo se dice?"}),
      P("¿Qué significa…?","What does… mean?",{say:"¿Qué significa?"}),
      P("Un momento, por favor","One moment, please"),
      P("Está bien","That’s fine / OK"),
      P("Sí","Yes"), P("No","No"),
    ]},
  ]},

  { id:"restaurante", chip:"Restaurant", es:"En el restorán", en:"At the restaurant", blocks:[
    { h:"Pedir", en:"Ordering", items:[
      P("Una mesa para tres, por favor","A table for three, please"),
      P("¿Puedo ver la carta?","Can I see the menu?"),
      P("¿Hay menú del día?","Is there a daily special?",{note:"Weekday lunch specials are often called “menú ejecutivo”"}),
      P("¿Qué me recomendás?","What do you recommend?"),
      P("Quería…","I’d like…",{say:"Quería",note:"The polite way to order"}),
      P("Para mí, la milanesa","For me, the milanesa"),
      P("¿Con qué viene?","What does it come with?",{note:"At a parrilla, sides are often ordered separately"}),
      P("Para compartir","To share"),
      P("Sin cebolla, por favor","No onion, please",{note:"Swap in any food: sin tomate, sin queso…"}),
      P("¿Me traés agua, por favor?","Can you bring me water, please?"),
      P("Otro, por favor","Another one, please"),
      P("Para llevar","To go"),
    ]},
    { h:"La carne", en:"How you want your meat", items:[
      P("jugoso","rare / pink inside"),
      P("a punto","medium"),
      P("bien cocido","well done"),
    ]},
    { h:"Lo que dice el mozo", en:"What the waiter says", items:[
      P("¿Qué van a pedir?","What are you going to order?"),
      P("¿Y para tomar?","And to drink?"),
      P("¿Van a querer postre?","Do you want dessert?"),
      P("No tenemos chivito hoy.","We don’t have chivito today."),
      P("La cocina cierra en diez minutos.","The kitchen closes in ten minutes."),
    ]},
    { h:"Al final", en:"Wrapping up", items:[
      P("¡Está muy rico!","It’s delicious!"),
      P("La cuenta, por favor","The check, please"),
      P("¿Puedo pagar con tarjeta?","Can I pay by card?"),
    ]},
    { type:"aside", cls:"warm", h:"El cubierto y la propina", body:[
      "<b>Cubierto</b> on the bill is a per-person cover charge (bread, table setting). It’s normal, not a scam.",
      "<b>Propina</b> (tip) is about 10%, often left in cash. See the <b>Menú</b> tab for a full menu decoder."
    ]},
  ]},

  { id:"cafe", chip:"Café, bakery & ice cream", es:"Café, panadería y helado", en:"Café, bakery & ice cream", blocks:[
    { items:[
      P("Quería un café con leche","I’d like a coffee with milk"),
      P("Un cortado, por favor","An espresso with a splash of milk, please"),
      P("Dos medialunas, por favor","Two croissants, please"),
      P("¿Para acá o para llevar?","For here or to go?",{note:"What they’ll ask you"}),
      P("Media docena de bizcochos","Half a dozen pastries",{note:"The classic bakery order to share"}),
      P("¿Qué gustos tenés?","What flavors do you have?",{note:"Ice cream flavors are “gustos” here"}),
      P("Un cucurucho de dulce de leche","A dulce de leche cone"),
      P("Quiero un helado","I want an ice cream"),
    ]},
  ]},

  { id:"plata", chip:"Money & shopping", es:"Plata y compras", en:"Money & shopping", blocks:[
    { type:"converter" },
    { h:"Pagar", en:"Paying", items:[
      P("¿Cuánto sale?","How much is it?"),
      P("¿Puedo pagar con tarjeta?","Can I pay by card?"),
      P("¿Aceptan tarjeta?","Do you take card?"),
      P("En efectivo","In cash"),
      P("¿Tenés cambio?","Do you have change?"),
      P("¿Me cobrás?","Can you ring me up?"),
      P("¿Débito o crédito?","Debit or credit?",{note:"What they’ll ask when you hand over a card"}),
      P("¿En cuántas cuotas?","In how many installments?",{note:"Uruguayans split credit purchases into payments. Just say “En una”."}),
      P("En una","In one (payment)"),
      P("¿Hay un cajero por acá?","Is there an ATM around here?"),
      P("Solo aceptamos efectivo.","We only take cash."),
    ]},
    { h:"Comprar", en:"Shopping", items:[
      P("Estoy mirando, nomás","Just looking"),
      P("¿Me mostrás ese?","Can you show me that one?"),
      P("Me llevo esto","I’ll take this"),
      P("¿Qué talle?","What size (clothing)?"),
      P("Está barato","It’s cheap"), P("Está caro","It’s expensive"),
      P("la feria","the street market"), P("el puesto","the stall"),
    ]},
    { type:"aside", cls:"warm", h:"Ojo con el $", body:[
      "In Uruguay <b>$</b> means <b>pesos</b>. Dollars are written <b>U$S</b>. Rough rule: divide by 40, so <b>$400 ≈ US$10</b>. The rate drifts, so check it when you land."
    ], chips:[ P("la plata","money"), P("quinientos pesos","500 pesos") ]},
  ]},

  { id:"numeros", chip:"Numbers", es:"Los números", en:"Numbers & prices", blocks:[
    { type:"nums", h:"0–15", en:"The basics",
      items:[
        {v:"0",w:"cero"},{v:"1",w:"uno"},{v:"2",w:"dos"},{v:"3",w:"tres"},{v:"4",w:"cuatro"},{v:"5",w:"cinco"},
        {v:"6",w:"seis"},{v:"7",w:"siete"},{v:"8",w:"ocho"},{v:"9",w:"nueve"},{v:"10",w:"diez"},{v:"11",w:"once"},
        {v:"12",w:"doce"},{v:"13",w:"trece"},{v:"14",w:"catorce"},{v:"15",w:"quince"}
    ]},
    { type:"nums", h:"Las decenas", en:"Tens",
      items:[
        {v:"16",w:"dieciséis"},{v:"20",w:"veinte"},{v:"25",w:"veinticinco"},{v:"30",w:"treinta"},{v:"40",w:"cuarenta"},
        {v:"50",w:"cincuenta"},{v:"60",w:"sesenta"},{v:"70",w:"setenta"},{v:"80",w:"ochenta"},{v:"90",w:"noventa"},{v:"100",w:"cien"}
    ]},
    { type:"nums", h:"Los precios", en:"The money numbers", note:"Watch for quinientos (500) — it’s irregular.",
      items:[
        {v:"200",w:"doscientos"},{v:"300",w:"trescientos"},{v:"400",w:"cuatrocientos"},{v:"500",w:"quinientos"},
        {v:"600",w:"seiscientos"},{v:"700",w:"setecientos"},{v:"800",w:"ochocientos"},{v:"900",w:"novecientos"},
        {v:"1.000",w:"mil"},{v:"1.500",w:"mil quinientos"},{v:"2.000",w:"dos mil"}
    ]},
  ]},

  { id:"direcciones", chip:"Directions", es:"¿Dónde queda?", en:"Finding your way", blocks:[
    { h:"Preguntar", en:"Asking", items:[
      P("¿Dónde queda…?","Where is…?",{say:"¿Dónde queda?",note:"The local way to ask"}),
      P("¿Dónde queda el baño?","Where’s the bathroom?"),
      P("¿Dónde queda la farmacia?","Where’s the pharmacy?"),
      P("¿Dónde queda el Hotel Argentino?","Where’s the Hotel Argentino?"),
      P("¿Hay un cajero por acá?","Is there an ATM around here?"),
      P("¿Hay una panadería por acá?","Is there a bakery nearby?"),
    ]},
    { h:"Entender la respuesta", en:"Understanding the answer", items:[
      P("Está cerca","It’s close"), P("Está lejos","It’s far"),
      P("A la derecha","To the right"), P("A la izquierda","To the left"), P("Derecho","Straight ahead"),
      P("al lado de","next to"), P("enfrente de","across from"), P("en la esquina","on the corner"),
      P("cerca de","near"), P("acá","here"),
    ]},
    { h:"Lugares", en:"Places", items:[
      P("la playa","the beach"), P("la rambla","the waterfront promenade"), P("el cerro","the hill"),
      P("el puerto","the port"), P("la plaza","the square"), P("el mercado","the market"),
      P("la iglesia","the church"), P("el supermercado","the supermarket"),
    ]},
  ]},

  { id:"auto", chip:"Car & driving", es:"El auto y la ruta", en:"Car, gas & road signs", blocks:[
    { h:"La estación de servicio", en:"At the gas station", items:[
      P("Lleno, por favor","Fill it up, please"),
      P("Lleno de súper, por favor","Fill it with regular, please",{note:"Check which fuel your rental car takes"}),
      P("nafta","gasoline"),
      P("¿Cuánto es?","How much is it?"),
      P("¿Aceptan tarjeta?","Do you take card?"),
      P("¿Hay un baño?","Is there a bathroom?"),
    ]},
    { h:"Manejar", en:"Driving", items:[
      P("¿Dónde puedo estacionar?","Where can I park?"),
      P("el estacionamiento","parking"),
      P("la ruta","the highway"),
      P("el peaje","the toll"),
      P("la rotonda","the roundabout"),
      P("Pare","Stop (sign)"),
      P("Ceda el paso","Yield (sign)"),
      P("Prohibido estacionar","No parking"),
    ]},
    { type:"aside", cls:"warm", h:"De paso", body:[
      "Gas stations are <b>full-service</b>: stay in the car and say <b>“Lleno, por favor.”</b>",
      "Ask the rental desk about the <b>toll tag</b> (telepeaje) for the Interbalnearia highway, and keep your headlights on when driving on highways."
    ]},
  ]},

  { id:"hora", chip:"Time & signs", es:"La hora y los carteles", en:"Time, hours & signs", blocks:[
    { h:"La hora", en:"Time", items:[
      P("¿Qué hora es?","What time is it?"),
      P("¿A qué hora abre?","What time does it open?"),
      P("¿A qué hora cierra?","What time does it close?"),
      P("¿Está abierto ahora?","Is it open now?"),
      P("Abre a las nueve","It opens at 9"), P("Cierra a las ocho","It closes at 8"),
      P("y media","half past"), P("de la mañana","a.m."), P("de la tarde","afternoon (~12–7)"), P("de la noche","evening / night"),
    ]},
    { h:"Los carteles", en:"Signs", items:[
      P("abierto","open"), P("cerrado","closed"), P("el horario","the hours"),
      P("feriado","public holiday",{note:"Often closed!"}),
      P("Entrada","Entrance"), P("Salida","Exit"),
      P("Empuje","Push"), P("Tire","Pull"),
      P("Baños","Restrooms"), P("Damas","Women"), P("Caballeros","Men"),
    ]},
    { h:"Los días", en:"Days", items:[
      P("lunes","Monday"), P("martes","Tuesday"), P("miércoles","Wednesday"), P("jueves","Thursday"),
      P("viernes","Friday"), P("sábado","Saturday"), P("domingo","Sunday"),
    ]},
    { type:"aside", h:"El reloj de 24 horas", body:[
      "Signs use 24-hour time: <b>13:00 = 1 p.m. · 18:00 = 6 p.m. · 20:00 = 8 p.m.</b> Subtract 12 after noon. Dinner starts late here, often after 21:00."
    ]},
  ]},

  { id:"paseos", chip:"Beach & sightseeing", es:"Playa y paseos", en:"Beach & sightseeing", blocks:[
    { h:"En la playa", en:"At the beach", items:[
      P("la playa","the beach"), P("las olas","the waves"),
      P("la sombrilla","the beach umbrella"),
      P("el protector solar","sunscreen"),
      P("el guardavidas","the lifeguard"),
      P("¿Se puede nadar acá?","Can you swim here?"),
      P("la bandera roja","the red flag",{note:"Red flag = no swimming"}),
    ]},
    { h:"De paseo", en:"Sightseeing", items:[
      P("Tres entradas, por favor","Three tickets, please"),
      P("¿Cuánto sale la entrada?","How much is the ticket?"),
      P("¿Me sacás una foto?","Can you take a photo of me?"),
      P("la aerosilla","the chairlift"),
      P("el castillo","the castle"),
      P("el museo","the museum"),
      P("el barco","the boat"),
      P("los lobos marinos","the sea lions"),
      P("el atardecer","the sunset"),
      P("¡Vamos a la playa!","Let’s go to the beach!"),
    ]},
  ]},

  { id:"casa", chip:"Hotel / house", es:"El hotel o la casa", en:"Where you’re staying", blocks:[
    { items:[
      P("Tengo una reserva","I have a reservation"),
      P("la llave","the key"),
      P("¿Cuál es la clave del wifi?","What’s the wifi password?"),
      P("No hay agua caliente","There’s no hot water"),
      P("No funciona","It doesn’t work"),
      P("¿Podés ayudarme?","Can you help me?"),
    ]},
  ]},

  { id:"salud", chip:"Pharmacy & health", es:"Farmacia y salud", en:"Pharmacy & feeling unwell", blocks:[
    { items:[
      P("¿Dónde queda la farmacia?","Where’s the pharmacy?"),
      P("¿Tenés algo para el dolor de cabeza?","Do you have something for a headache?"),
      P("Me duele la cabeza","My head hurts"),
      P("Me duele la panza","My stomach hurts",{note:"“panza” is the everyday word"}),
      P("Me duele la garganta","My throat hurts"),
      P("Tengo fiebre","I have a fever"),
      P("Tengo alergia a…","I’m allergic to…",{say:"Tengo alergia"}),
      P("Me quemé con el sol","I got sunburned"),
      P("el protector solar","sunscreen"),
      P("el repelente","bug spray"),
      P("una curita","a band-aid"),
    ]},
  ]},

  { id:"emergencias", chip:"Emergencies", es:"Emergencias", en:"Emergencies — call 911", blocks:[
    { items:[
      P("¡Necesito ayuda!","I need help!"),
      P("Necesito un médico","I need a doctor"),
      P("Necesito ir al hospital","I need to go to the hospital"),
      P("¡Llamá a la policía!","Call the police!"),
      P("¡Llamá una ambulancia!","Call an ambulance!"),
      P("Perdí mi pasaporte","I lost my passport"),
      P("Perdí mi teléfono","I lost my phone"),
      P("Perdí mi billetera","I lost my wallet"),
      P("Perdí mi cartera","I lost my purse"),
      P("Me robaron","I was robbed"),
    ]},
    { type:"aside", cls:"warm", h:"911", body:[
      "Uruguay’s emergency number is <b>911</b>, the same as at home."
    ]},
  ]},
];

/* ---------- Menu decoder (glossary by menu section) ---------- */
/* tag:"fam" marks safe, familiar picks */
const MENU_GLOSS = [
  { h:"Entradas", en:"Starters", items:[
    P("la provoleta","grilled provolone cheese, crispy outside",{tag:"fam"}),
    P("la empanada","stuffed pastry — carne, jamón y queso, pollo…",{tag:"fam"}),
    P("las rabas","fried squid rings"),
    P("los buñuelos de algas","seaweed fritters — a coastal classic"),
    P("la picada","snack board to share: cheese, cold cuts, olives"),
    P("la tortilla","thick potato omelet (Spanish style)"),
    P("la pascualina","spinach & egg pie"),
  ]},
  { h:"Parrilla", en:"From the grill", items:[
    P("el asado de tira","cross-cut beef short ribs — THE parrilla order"),
    P("el vacío","flank steak, juicy and fatty"),
    P("el entrecot","ribeye-style steak",{tag:"fam"}),
    P("el bife de chorizo","sirloin strip (not sausage!)",{tag:"fam"}),
    P("la entraña","skirt steak"),
    P("la pamplona","rolled meat stuffed with ham, cheese & peppers"),
    P("el chorizo","grilled sausage",{tag:"fam"}),
    P("la morcilla","blood sausage — the “dulce” kind has nuts & orange"),
    P("las achuras","organ meats (chinchulines, mollejas, riñones)",{note:"Skip if you’re not adventurous"}),
    P("la parrillada","mixed grill for the table"),
    P("el pollo","chicken",{tag:"fam"}),
  ]},
  { h:"Platos", en:"Main dishes", items:[
    P("el chivito","steak sandwich with ham, cheese, egg & more",{tag:"fam"}),
    P("el chivito al plato","the chivito on a plate with fries, no bread",{tag:"fam"}),
    P("la milanesa","breaded cutlet (beef or chicken)",{tag:"fam"}),
    P("la milanesa a la napolitana","milanesa with ham, tomato sauce & cheese",{tag:"fam"}),
    P("la hamburguesa completa","burger with ham, cheese, egg, lettuce & tomato",{tag:"fam"}),
    P("los ñoquis","gnocchi — traditional on the 29th of the month"),
    P("los ravioles","ravioli",{tag:"fam"}),
    P("los tallarines","fettuccine-style noodles",{tag:"fam"}),
    P("la salsa caruso","cream sauce with ham, mushrooms & cheese — invented in Uruguay"),
    P("la tarta","savory pie"),
  ]},
  { h:"Pescados y mariscos", en:"Fish & seafood", items:[
    P("la merluza","hake — mild white fish",{tag:"fam"}),
    P("la brótola","local white fish, flaky"),
    P("la corvina","croaker — firm local fish"),
    P("el lenguado","sole"),
    P("los camarones","shrimp"),
    P("el siri","small local crab — great in empanadas"),
    P("los mejillones","mussels"),
    P("la cazuela de mariscos","seafood stew"),
    P("a la romana","battered & fried",{tag:"fam"}),
    P("a la plancha","grilled on a flat-top"),
    P("a la parrilla","on the grill"),
  ]},
  { h:"Pizzería", en:"Pizza place", items:[
    P("la pizza","pizza — often thick, sold by the slice or whole",{tag:"fam"}),
    P("la muzzarella","cheese pizza",{tag:"fam"}),
    P("el fainá","chickpea flatbread, eaten on top of pizza"),
    P("la pizza a caballo","pizza with a slice of fainá on top"),
    P("la porción","a slice / a portion"),
    P("el pancho","hot dog",{tag:"fam"}),
    P("la pizzeta","small personal pizza",{tag:"fam"}),
  ]},
  { h:"Guarniciones", en:"Sides — often ordered separately", items:[
    P("las papas fritas","french fries",{tag:"fam"}),
    P("el puré","mashed potatoes",{tag:"fam"}),
    P("la ensalada mixta","lettuce, tomato & onion",{tag:"fam"}),
    P("las verduras grilladas","grilled vegetables"),
    P("el boniato","sweet potato"),
    P("el arroz","rice",{tag:"fam"}),
  ]},
  { h:"Ingredientes", en:"Words that change the dish", items:[
    P("el jamón","ham"), P("el queso","cheese"), P("la panceta","bacon"),
    P("el huevo","egg"), P("la palta","avocado",{note:"not “aguacate”"}),
    P("el morrón","bell pepper"), P("el choclo","corn"), P("el zapallo","squash / pumpkin"),
    P("la manteca","butter"), P("la crema","cream"), P("la cebolla","onion"), P("el tomate","tomato"),
    P("completo","“with everything” (ham, cheese, egg…)"),
  ]},
  { h:"Postres", en:"Desserts", items:[
    P("el flan","caramel custard",{tag:"fam"}),
    P("con dulce de leche","with dulce de leche"),
    P("el panqueque de dulce de leche","crepe rolled with dulce de leche",{tag:"fam"}),
    P("el chajá","meringue, peaches & cream cake — very Uruguayan"),
    P("el Martín Fierro","cheese with quince paste"),
    P("el alfajor","cookie sandwich with dulce de leche",{tag:"fam"}),
    P("la ensalada de frutas","fruit salad",{tag:"fam"}),
  ]},
  { h:"Café y panadería", en:"Café & bakery", items:[
    P("el café","espresso-style coffee"),
    P("el cortado","espresso with a little milk"),
    P("el café con leche","coffee with milk, latte-style",{tag:"fam"}),
    P("la lágrima","mostly milk with a “tear” of coffee"),
    P("el submarino","hot milk with a chocolate bar to melt in",{tag:"fam"}),
    P("la medialuna","croissant — dulce (sweet) or de grasa (savory)",{tag:"fam"}),
    P("el tostado","grilled ham & cheese sandwich",{tag:"fam"}),
    P("los bizcochos","assorted pastries, sold by the piece"),
    P("las tortas fritas","fried dough — a rainy-day tradition"),
    P("el licuado","fruit smoothie, with milk or water"),
  ]},
  { h:"Heladería", en:"Ice cream shop", items:[
    P("el cucurucho","cone"), P("el vasito","small cup"),
    P("un cuarto kilo","a quarter kilo tub — for sharing"),
    P("el dulce de leche granizado","dulce de leche with chocolate chips"),
    P("la frutilla","strawberry",{note:"not “fresa”"}),
    P("la crema americana","vanilla-style cream flavor",{tag:"fam"}),
    P("el limón","lemon"), P("el chocolate","chocolate",{tag:"fam"}),
  ]},
  { h:"Para tomar", en:"Drinks", items:[
    P("el agua sin gas","still water"), P("el agua con gas","sparkling water"),
    P("el refresco","soda"),
    P("el jugo natural","fresh-squeezed juice"),
    P("la limonada","lemonade"),
    P("el té","tea"),
  ]},
];

/* ---------- Sample menus (composites of typical Piriápolis places; prices are rough 2026 examples) ---------- */
const SAMPLE_MENUS = [
  { id:"parrilla", es:"Parrilla de barrio", en:"Neighborhood grill house", note:"Plates are big, so ordering 2 mains for 3 people plus sides is normal.", sections:[
    { h:"Entradas", items:[ ["la provoleta",390], ["el chorizo",190], ["la morcilla dulce",190], ["la empanada de carne",110] ]},
    { h:"Parrilla", items:[ ["el asado de tira",790], ["el vacío",780], ["el entrecot",850], ["el pollo deshuesado",590], ["la parrillada para dos",2200] ]},
    { h:"Platos", items:[ ["el chivito al plato",790], ["la milanesa a la napolitana con fritas",690] ]},
    { h:"Guarniciones", items:[ ["las papas fritas",260], ["el puré",220], ["la ensalada mixta",250] ]},
    { h:"Postres", items:[ ["el flan con dulce de leche",260], ["el panqueque de dulce de leche",260] ]},
    { h:"Bebidas", items:[ ["el agua sin gas",140], ["el refresco",140], ["el jugo natural",220] ]},
  ], footer:[ ["el cubierto",90,"per person"] ]},

  { id:"puerto", es:"Puesto del puerto", en:"Seafood stand by the port", note:"Casual counter service. Point and say “Quería…”.", sections:[
    { h:"Empanadas", items:[ ["la empanada de pescado",120], ["la empanada de camarones",140], ["la empanada de siri",140] ]},
    { h:"Para picar", items:[ ["las rabas",520], ["los buñuelos de algas",320] ]},
    { h:"Platos", items:[ ["la merluza a la romana con fritas",590], ["la brótola a la plancha con puré",650], ["la corvina a la parrilla",690], ["la cazuela de mariscos",890] ]},
    { h:"Al pan", items:[ ["el sándwich de milanesa de pescado",390] ]},
    { h:"Bebidas", items:[ ["el agua con gas",130], ["el refresco",130], ["la limonada",180] ]},
  ]},

  { id:"cafe", es:"Café y confitería", en:"Café & bakery — breakfast and afternoon “merienda”", note:"“Merienda” is the late-afternoon coffee-and-pastry break, around 17:00.", sections:[
    { h:"Café", items:[ ["el café",110], ["el cortado",130], ["el café con leche",170], ["la lágrima",160], ["el submarino",190], ["el té",110] ]},
    { h:"Panadería", items:[ ["la medialuna",60], ["los bizcochos",35,"each"], ["el alfajor",90], ["la torta de la casa",230] ]},
    { h:"Salado", items:[ ["el tostado de jamón y queso",290], ["el desayuno completo",390,"coffee, juice, 2 medialunas"] ]},
    { h:"Jugos", items:[ ["el jugo de naranja",220], ["el licuado de frutilla",240] ]},
  ]},

  { id:"pizzeria", es:"Pizzería y rotisería", en:"Pizza & takeout counter", note:"Great for a cheap family dinner or takeout back to the house.", sections:[
    { h:"Pizzas", items:[ ["la muzzarella entera",560], ["la porción de muzzarella",120], ["la pizza napolitana",640], ["el fainá",90,"per slice"], ["la pizza a caballo",210,"slice + fainá"] ]},
    { h:"Empanadas", items:[ ["la empanada de carne",110], ["la empanada de jamón y queso",110], ["la empanada de pollo",110] ]},
    { h:"Al pan", items:[ ["el chivito canadiense",590], ["la hamburguesa completa",450], ["el pancho",160] ]},
    { h:"Para llevar", items:[ ["la docena de empanadas",1200] ]},
  ]},

  { id:"helados", es:"Heladería en la rambla", en:"Ice cream on the waterfront", note:"Ask “¿Qué gustos tenés?” and pick up to 2 or 3 flavors per cone.", sections:[
    { h:"Tamaños", items:[ ["el cucurucho chico",180], ["el cucurucho grande",260], ["el vasito",200], ["un cuarto kilo",390] ]},
    { h:"Gustos", items:[ ["el dulce de leche"], ["el dulce de leche granizado"], ["la frutilla"], ["la crema americana"], ["el chocolate"], ["el limón"] ]},
  ]},
];

/* ---------- Outings, biggest to smallest (no dates) ---------- */
const GMAP = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const EXC = [
  /* ----- GRANDE ----- */
  { id:"punta-del-este", size:"grande", name:"Punta del Este + Isla de Lobos boat", es:"Punta del Este y la Isla de Lobos",
    time:"Full day", dist:"~40 km · 45 min", tags:["Book ahead","Weather dependent"],
    blurb:"The big resort city. Take the noon boat out to see the sea lion colony on Isla de Lobos (about 2 hours round trip), then a seafood lunch at the port and a walk around the peninsula and lighthouse.",
    tips:["The boat needs calm weather and a 10-passenger minimum. Visitors can’t land on the island.","Boats run about US$40–70 per person. Wear non-skid shoes.","No boat? Sea lions hang around the port for free, especially mid-morning and late afternoon when fishing boats come in."],
    links:[["Punta del Este","https://en.wikipedia.org/wiki/Punta_del_Este"],["Isla de Lobos","https://en.wikipedia.org/wiki/Isla_de_Lobos"],["Port guide","https://lorenzigo.com/?p=32771"]],
    map:"Puerto de Punta del Este Uruguay",
    say:[P("el barco","the boat"),P("los lobos marinos","the sea lions"),P("Tres entradas, por favor","Three tickets, please")] },

  { id:"montevideo", size:"grande", name:"Montevideo: Ciudad Vieja", es:"Montevideo, la Ciudad Vieja",
    time:"Full day", dist:"~97 km · 1 h 20 min", tags:["Rain OK","Culture"],
    blurb:"The capital’s old town: walk the pedestrian streets, pick a museum or two, and have a long parrilla lunch. Leave early and be back by evening.",
    tips:["Museums make this a good rainy-day pick.","Same highway you drove from the airport, so the route is familiar."],
    links:[["Ciudad Vieja","https://en.wikipedia.org/wiki/Ciudad_Vieja,_Montevideo"]],
    map:"Ciudad Vieja Montevideo Uruguay",
    say:[P("¿Dónde queda el museo?","Where’s the museum?"),P("¿Dónde puedo estacionar?","Where can I park?"),P("Una mesa para tres, por favor","A table for three, please")] },

  { id:"punta-ballena", size:"grande", name:"Punta Ballena: Arboretum Lussich + Casapueblo", es:"Punta Ballena y Casapueblo",
    time:"Most of a day (until sunset)", dist:"~30 km · 35 min", tags:["Sunset","Book ahead","Rain OK"],
    blurb:"Morning in the Lussich arboretum’s forest trails, then Casapueblo, the white cliffside “livable sculpture” by artist Carlos Páez Vilaró. Stay for sunset, when a poem is read over the speakers.",
    tips:["Casapueblo opens about 10am to sunset. Tickets run around $600 pesos (≈US$15). Kids under 12 free.","Arrive 40–60 minutes before sunset to get a good spot on the terrace.","Lots of stairs and levels."],
    links:[["Casapueblo","https://en.wikipedia.org/wiki/Casapueblo"],["Official site","https://clubhotelcasapueblo.com"],["Arboretum Lussich","https://en.wikipedia.org/wiki/Lussich_Arboretum"]],
    map:"Casapueblo Punta Ballena Uruguay",
    say:[P("¿Cuánto sale la entrada?","How much is the ticket?"),P("el atardecer","the sunset"),P("¡Qué lindo!","How pretty!")] },

  { id:"costa-serrana", size:"grande", name:"Costa Serrana drive (Ruta 60)", es:"La Costa Serrana",
    time:"Full day", dist:"Loop drive, 2–3 h at the wheel", tags:["Scenic drive","Picnic"],
    blurb:"Trade the coast for the hills. Ruta 60 winds through the sierras between Maldonado and Lavalleja, past old mills, small waterfalls and farm country. Pack a picnic.",
    tips:["Ask the Piriápolis tourist office for current stops and road conditions before you go.","Fill the tank first. Gas stations get sparse inland."],
    links:[["Sierra de las Ánimas","https://en.wikipedia.org/wiki/Sierra_de_las_%C3%81nimas"]],
    map:"Ruta 60 Maldonado Uruguay",
    say:[P("Lleno, por favor","Fill it up, please"),P("la ruta","the highway"),P("¿Está lejos?","Is it far?")] },

  /* ----- MEDIANO ----- */
  { id:"pan-de-azucar", size:"mediano", name:"Pan de Azúcar reserve & hike", es:"El Cerro Pan de Azúcar",
    time:"Half day", dist:"~6 km · 10 min", tags:["Walking","Animals"],
    blurb:"A nature reserve at the foot of Uruguay’s third-highest hill, with native animals (look for capybaras), easy flat trails, and a marked trail up to the big cross at the top if you have the energy.",
    tips:["Pick the trail by energy that day. The flat trails near the entrance are plenty.","The summit climb is moderate and sometimes closes in extreme heat. Go early or late, not midday.","There’s a restaurant and picnic area at the entrance."],
    links:[["The reserve","https://en.wikipedia.org/wiki/Estaci%C3%B3n_de_Cr%C3%ADa_de_Fauna_aut%C3%B3ctona_Cerro_Pan_de_Az%C3%BAcar"],["Cerro Pan de Azúcar","https://en.wikipedia.org/wiki/Cerro_Pan_de_Az%C3%BAcar"]],
    map:"Reserva de Fauna Cerro Pan de Azúcar Piriápolis Uruguay",
    say:[P("¿A qué hora cierra?","What time does it close?"),P("Necesito agua.","I need water."),P("¿Me sacás una foto?","Can you take a photo of me?")] },

  { id:"toro-piria", size:"mediano", name:"Cerro del Toro + Castillo de Piria", es:"El Cerro del Toro y el Castillo de Piria",
    time:"Half day", dist:"In town + ~5 km", tags:["Rain OK","History"],
    blurb:"Drive up Cerro del Toro for the bronze bull fountain and the view, then visit the castle-home of Francisco Piria, the town’s eccentric founder, complete with a basement alchemy lab.",
    tips:["The castle keeps short hours (historically Tuesday–Sunday, mornings to mid-afternoon) and is sometimes closed. Check before driving out.","Pairs well with Castillo Pittamiglio on another day."],
    links:[["Castillo de Piria","https://www.infocasas.com.uy/blog/?p=1500"],["Map: Cerro del Toro",GMAP("Cerro del Toro Piriápolis Uruguay")]],
    map:"Castillo de Piria Piriápolis Uruguay",
    say:[P("el castillo","the castle"),P("¿Está abierto ahora?","Is it open now?"),P("¿A qué hora abre?","What time does it open?")] },

  { id:"las-flores", size:"mediano", name:"Las Flores + Castillo Pittamiglio", es:"Las Flores y el Castillo Pittamiglio",
    time:"Half day", dist:"~8 km west", tags:["Rain OK","Beach"],
    blurb:"A quiet beach town next door, plus the odd little castle built by alchemist-architect Humberto Pittamiglio. Spend the afternoon on the beach after.",
    tips:["Check opening hours for the castle before you go."],
    links:[["Las Flores","https://www.welcomeuruguay.com/piriapolis/minutes-away-las-flores.html"],["Castillo Pittamiglio","https://www.lonelyplanet.com/points-of-interest/castillo-pittamiglio/1273963"]],
    map:"Castillo Pittamiglio Las Flores Maldonado Uruguay",
    say:[P("el castillo","the castle"),P("¿Cuánto sale la entrada?","How much is the ticket?")] },

  { id:"san-antonio", size:"mediano", name:"Cerro San Antonio & the chairlift", es:"El Cerro San Antonio",
    time:"2–3 hours", dist:"By the port, in town", tags:["Sunset","Views"],
    blurb:"Ride Uruguay’s only chairlift from the port up the 130 m hill to the little chapel and the best view of the bay. You can also drive or walk up. Seafood empanadas at the port stands after.",
    tips:["Go late afternoon for the views and sunset.","Chairlift hours change with the season and wind, so check at the booth.","It’s free to visit the hilltop; the chairlift is paid per ride."],
    links:[["Cerro San Antonio","https://en.wikipedia.org/wiki/Cerro_San_Antonio,_Piri%C3%A1polis"],["About the chairlift","https://www.infocasas.com.uy/blog/?p=1487"]],
    map:"Aerosilla Cerro San Antonio Piriápolis Uruguay",
    say:[P("la aerosilla","the chairlift"),P("Tres entradas, por favor","Three tickets, please"),P("la empanada de pescado","fish empanada")] },

  /* ----- PEQUEÑO ----- */
  { id:"rambla", size:"pequeno", name:"Rambla, port & Argentino Hotel", es:"La rambla y el Hotel Argentino",
    time:"1–2 hours", dist:"Walk from anywhere", tags:["Rain OK","Easy"],
    blurb:"Stroll the waterfront to the port, peek into the grand old Argentino Hotel’s public areas, and stop at the tourist office next door for event listings and bilingual tours.",
    tips:["Ask the tourist office what’s on this week and about feria days."],
    links:[["Argentino Hotel","https://www.infocasas.com.uy/blog/?p=1432"],["Ideas for Piriápolis","https://www.infocasas.com.uy/blog/?p=1116"]],
    map:"Argentino Hotel Piriápolis Uruguay",
    say:[P("¿Dónde queda el Hotel Argentino?","Where’s the Hotel Argentino?"),P("¡Vamos a la rambla!","Let’s go to the rambla!")] },

  { id:"pasiva", size:"pequeno", name:"Paseo de la Pasiva & the feria", es:"El Paseo de la Pasiva y la feria",
    time:"1–2 hours", dist:"On the rambla", tags:["Shopping","Easy"],
    blurb:"The artisan fair on the Rambla de los Argentinos, plus the street feria for fruit, cheese and odds and ends. The best place for souvenirs and for practicing your numbers.",
    tips:["Bring cash in small bills.","Confirm feria days and hours with the tourist office. The artisan fair runs late in high season."],
    links:[["Map: Paseo de la Pasiva",GMAP("Paseo de la Pasiva Piriápolis Uruguay")]],
    map:"Paseo de la Pasiva Piriápolis Uruguay",
    say:[P("Estoy mirando, nomás","Just looking"),P("¿Cuánto sale?","How much is it?"),P("Me llevo esto","I’ll take this")] },

  { id:"punta-colorada", size:"pequeno", name:"Playa Mansa, Punta Colorada (sunset)", es:"Punta Colorada",
    time:"1–2 hours", dist:"~7 km east", tags:["Sunset","Beach"],
    blurb:"A calm little beach just east of town. Go late afternoon and stay for the sunset.",
    tips:["A nice low-key evening after a big day out."],
    links:[["Map: Playa Mansa",GMAP("Playa Mansa Punta Colorada Maldonado Uruguay")]],
    map:"Playa Mansa Punta Colorada Maldonado Uruguay",
    say:[P("el atardecer","the sunset"),P("la playa","the beach")] },

  { id:"punta-fria", size:"pequeno", name:"Punta Fría walk", es:"Punta Fría",
    time:"About 1 hour", dist:"East end of the rambla", tags:["Walking","Easy"],
    blurb:"An easy walk along the water to the rocky point at the east end of town.",
    tips:["Good after a long lunch."],
    links:[["Map: Punta Fría",GMAP("Punta Fría Piriápolis Uruguay")]],
    map:"Punta Fría Piriápolis Uruguay",
    say:[P("¿Querés caminar?","Do you want to walk?")] },

  { id:"venus", size:"pequeno", name:"Fuente de Venus", es:"La Fuente de Venus",
    time:"Quick stop", dist:"Av. 25 de Mayo, edge of town", tags:["Easy","Photo"],
    blurb:"A 1911 fountain from Piria’s original town plan, on the avenue heading out of town. A quick photo stop on the way to somewhere else.",
    tips:["Combine with Cerro del Toro or the Pan de Azúcar drive."],
    links:[["Ideas for Piriápolis","https://www.infocasas.com.uy/blog/?p=1116"]],
    map:"Fuente de Venus Piriápolis Uruguay",
    say:[P("¿Me sacás una foto?","Can you take a photo of me?")] },

  { id:"playa", size:"pequeno", name:"Beach, cafés & ice cream", es:"La playa, un café y un helado",
    time:"As long as you like", dist:"Right there", tags:["Easy","Open day"],
    blurb:"The no-plan plan: beach time, a café merienda, and ice cream on the rambla.",
    tips:["Late November seas are still chilly. Bring layers and sunscreen."],
    links:[["Ice cream & café words","#menu-gloss"]],
    map:"Playa Piriápolis Uruguay",
    say:[P("¿Qué gustos tenés?","What flavors do you have?"),P("Dos medialunas, por favor","Two croissants, please")] },
];

const SIZE_LABEL = {
  grande:{es:"Grande", en:"Full-day trips"},
  mediano:{es:"Mediano", en:"Half-day outings"},
  pequeno:{es:"Pequeño", en:"An hour or two, close by"},
};
