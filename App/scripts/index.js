const penalties = {
		"vs" :  { engine: [0.0, 0.10, 0.25, 0.45],
				  tires:  [0.0, 0.05, 0.15, 0.35],
				  flags:  [0.0, 0.25, 0.50, 0.75],
				  errors:  1.0,
				},
		"solo": { engine: [0.0, 0.10, 0.15, 0.20],
				  tires:  [0.0, 0.05, 0.10, 0.15],
				  flags:  [0.0, 0.50, 1.00, 1.50],
				  errors:  0.5,
				},
	};

const i8n = {
		"en": { turns: "Complete Turns",
				finish: "Finish",
				engines: "Engines",
				tires: "Tires",
				flags: "Flags",
				penalties: "Additional Penalties",
				total: "Total Time",

			},
		"de": { turns: "Vollständige Züge",
				finish: "Zieleinlauf",
				engines: "Motoren",
				tires: "Reifen",
				flags: "Flaggen",
				penalties: "Weitere Fehler",
				total: "Gesamtzeit",
			},		
		"fr": { turns: "Tours complets",
				finish: "Finir",
				engines: "Moteur",
				tires: "Pneu",
				flags: "Drapeaux",
				penalties: "Pénalités supplémentaires",
				total: "Temps total",
			},
		"es": { turns: "Turnos completos",
				finish: "Acabado",
				engines: "Motores",
				tires: "Neumáticos",
				flags: "Banderas",
				penalties: "Sanciones adicionales",
				total: "Tiempo total",
			},			
		"it": { turns: "Complete Turns",
				finish: "Traguardo",
				engines: "Motori",
				tires: "Pneumatici",
				flags: "Bandiere",
				penalties: "Penalità aggiuntive",
				total: "Tempo totale",

			},			
	};

const data = {
	lang: Vue.ref("en"),
	mode: Vue.ref("vs"),
	i8n: Vue.computed(() => i8n[data.lang.value]),
	turns : Vue.ref(14),
	finish : Vue.ref(0),
	finish_penalty : Vue.computed(() => 1-data.finish.value/100),
	finish_text : Vue.computed(() => `+ ${data.finish_penalty.value.toFixed(2)}`),
	engines : Vue.ref(0),
	engines_factor : Vue.ref(0.05),
	engines_penalty : Vue.computed(() => penalties[data.mode.value].engine[data.engines.value]),
	engines_text : Vue.computed(() => `+ ${data.engines_penalty.value.toFixed(2)}`),
	tires : Vue.ref(0),
	tires_factor : Vue.ref(0.05),
	tires_penalty : Vue.computed(() => penalties[data.mode.value].tires[data.tires.value]),
	tires_text : Vue.computed(() => `+ ${data.tires_penalty.value.toFixed(2)}`),	
	flags : Vue.ref(0),
	flags_factor : Vue.ref(0.5),
	flags_penalty : Vue.computed(() => penalties[data.mode.value].flags[data.flags.value]),
	flags_text : Vue.computed(() => `+ ${data.flags_penalty.value.toFixed(2)}`),
	penalty : Vue.ref(0),
	penalty_penalty : Vue.computed(() => data.penalty.value * penalties[data.mode.value].errors),
	penalty_text : Vue.computed(() => `+ ${data.penalty_penalty.value.toFixed(2)}`),
	total_penalty : Vue.computed(() => data.finish_penalty.value + data.engines_penalty.value + data.tires_penalty.value + data.flags_penalty.value + data.penalty_penalty.value),
	total_penalty_sec : Vue.computed(() => parseInt(data.total_penalty.value)),
	total_penalty_hsec : Vue.computed(() => 100*(data.total_penalty.value - parseInt(data.total_penalty.value))),
	total_text : Vue.computed(() => `1 ' ${parseInt(data.turns.value) + data.total_penalty_sec.value} " ${data.total_penalty_hsec.value.toFixed().padStart(2,'0')}`),
};

$( document ).ready(function() {
	$(".vue").each((index, element) => { 
		Vue.createApp({
			data() {
				return {
					data: data,
				}
			},
		}).mount(element);
	
	});
	
	const radioapp = (props) => Vue.createApp({
		props: {
			variable: [Number, Object],
		},
		data() {
			return {
				app_variable: this.variable,
			}
		},
		mounted() {
			$(this.$el).parent().find("input[type='radio']").on("click",this.handleClick);
		},
		methods: {
			handleClick(radio) {
				let selected_value = radio.target.value;
				if (selected_value) {
					this.app_variable = selected_value;
					const siblings = $(this.$el).parent().find("input[type='radio'][value!=0]")
					siblings.filter(function() {return parseInt($(this).attr("value")) > selected_value}).removeClass("checked");	
					siblings.filter(function() {return parseInt($(this).attr("value")) <= selected_value}).addClass("checked");
				}
			}
		},
	}, props);
	
	radioapp({variable:data.engines}).mount("#radio_engines");	
	radioapp({variable:data.tires}).mount("#radio_tires");	
	radioapp({variable:data.flags}).mount("#radio_flags");

	$("[data-min]").each((index, element) => {
		let minimum = $(element).data("min");
		$(element).on("input",(event)=>{if(Number(event.target.value)!=event.target.value)event.target.value=minimum-1;if(event.target.value<minimum){event.target.value=minimum;event.target.dispatchEvent(new Event("input"))}});
	});

	$("[data-max]").each((index, element) => {
		let maximum = $(element).data("max");
		$(element).on("input",(event)=>{if(event.target.value>maximum){event.target.value=maximum;event.target.dispatchEvent(new Event("input"))}});
	});		
	
	const abouttext="9e/;P`lofkd\x1DEbimbo\x1D>mm\x1Dclo\x1Dqeb\x1DClojri^.`j\\\x1D?l^oad^jb9,e/;D^jb\x1D^ka\x1Ddo^mef`\x1Dabpfdk\x1D_v\x1DA^sfab\x1DDebicf9_o;Fjmibjbkq^qflk\x1Dlc\x1Dqeb\x1D^mm\x1D_v\x1DH^oi\x1DCo^kh";
	
	$("#about").on("click",()=>alertplus(cc(abouttext,3),{html:true}));
});

function cc(str, num) {
    var result = '';
    var charcode = 0;

    for (var i = 0; i < str.length; i++) {
        charcode = (str[i].charCodeAt()) + num;
        result += String.fromCharCode(charcode);
    }
    return result;
}

var jslocale=Array;
jslocale["Close"]="Close";
jslocale["Confirm"]="Confirm";
jslocale["Cancel"]="Cancel";

function sanitize(s) {
    if (s===undefined)
        return s
    if (typeof s === 'string' || s instanceof String)
        return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#x60;');
    return JSON.stringify(s);
}

//Open an alert dialog
//Valid options are:
//	html = true/false: 			Render content as HTML (default false)
//	big = true/false: 			Allow the alert to fill the entire screen (default false)
//	reference = DOM id: 		Attach a speechbubble effect to the given element (desktop only)
//								(default=disabled)
//	buttontext = String: 		Label used for the close button (default: jslocale["Close"])
//	initfunction = function: 	Function to be executed after opening the dialog. 
//								(default=none)
//	closefunction = function: 	Function to be executed upon closing the dialog. 
//								(default=none)
var __alertpluscreated=false;
function alertplus(content="", options={}) {
	if (!__alertpluscreated) {
		__alertpluscreated=true;
		$('body').append(`
			<div class="modal micromodal-slide" id="alertplusbox">
			<div class="modal__overlay" tabindex="-1">
			  <div class="modal__container" role="dialog">
				<div id="alertplusboxdata">
				</div>
				<footer>
				  <button id="alertplusboxbutton" class="plain"></button>
				</footer>
			  </div>
			</div>
		  </div>`
		);
		$('#alertplusboxbutton').on('click',close_alertplus);
	}
	if (options["html"])
		$('#alertplusboxdata').html(content);
	else
		$('#alertplusboxdata').text(content);
    if (options["big"])
        $('#alertplusbox main').css("max-width", "");
    else
        $('#alertplusbox main').css("max-width", "40rem");
	if (options["buttontext"]) {
		$('#alertplusboxbutton').html(sanitize(options["buttontext"]));
		$('#alertplusboxbutton').attr('title', sanitize(options["buttontext"]));
	} else {
		$('#alertplusboxbutton').html(sanitize(jslocale["Close"]));
		$('#alertplusboxbutton').attr('title', sanitize(jslocale["Close"]));
	}
	if (options["closefunction"]) {
		MicroModal.show('alertplusbox',{
			onClose: ()=>options["closefunction"](),
		});
	} else {
		MicroModal.show('alertplusbox');
	}
	if (options["initfunction"])
		options["initfunction"]();	
	if (options["reference"])
		__dialog2speechbubble("#alertplusbox .modal__container",options["reference"]);
}

//Close an alert dialog
function close_alertplus() {
	if (__alertpluscreated)
		MicroModal.close('alertplusbox');
}