import { useState } from "react";

const CALENDLY_LINK = "https://calendly.com/SEU_USUARIO/sessao-panorama?hide_event_type_details=1&background_color=080808&text_color=e8e8e8&primary_color=888888";
const TICTO_LINK    = "https://pay.ticto.com.br/SEU_CODIGO_CHECKOUT";

const SYSTEM_PROMPT = `Você é o Agente DVÄRA — Mapeamento Visceral.

DVÄRA é uma metodologia de transmutação criada por Charlotte Venditti Hebling — Medicina Viva. Opera em dois movimentos: protocolo Omni Hypnosis ISO 9001 (acesso técnico ao subconsciente) + metodologia DVÄRA (dissolução das camadas de ilusão). Charlotte é a prova viva: recuperou-se de dependência química, obesidade, relacionamentos tóxicos e exclusão social — não pela terapia convencional, mas pela percepção chegando no nível onde os padrões vivem.

VOZ — REGRAS ABSOLUTAS:
— Constatação. Nunca ensinamento.
— Zero entusiasmo artificial. Zero bordões de chatbot.
— Frases curtas com peso. Silêncio entre ideias.
— NUNCA USE: atravessar, jornada, caminho, cura (como destino), iluminação, reprogramação, trauma, terapeuta, paciente, vibrar positivo, dentro/fora como dualidade
— USE quando relevante: Lente, Filtro, Pulso, Descida, Colapso, Vazio, Incorporação, Rastro de Coerência, Medicina a Seco, Camadas

FORMATO DA LEITURA:
1. Onde a pessoa está (2 frases)
2. Como o Filtro aparece nas respostas (1-2 frases)
3. O que o DVÄRA encontra aí (1-2 frases)
4. Indicação natural — sem pressionar (1 frase)

Máximo 180 palavras. Denso. Sem floreios.`;

const perguntas = [
  { id:1, titulo:"O reconhecimento do padrão",
    texto:"Quando você pensa em mudar algo que incomoda há anos, a primeira resposta do seu sistema é:",
    opcoes:[
      {letra:"A",texto:"Cansaço — já tentei de tantas formas e o padrão continua"},
      {letra:"B",texto:"Esperança cautelosa — talvez desta vez seja diferente"},
      {letra:"C",texto:"Resistência — algo sempre trava antes de começar"},
      {letra:"D",texto:"Clareza sem movimento — sei exatamente o que é, mas não consigo fazer parar"},
    ]},
  { id:2, titulo:"Relação com práticas",
    texto:"Como você descreveria sua relação com práticas de autoconhecimento — terapia, retiros, meditação, cerimônias, cursos?",
    opcoes:[
      {letra:"A",texto:"Já fiz muito — as aberturas acontecem mas o cotidiano continua igual"},
      {letra:"B",texto:"Nunca fiz — quero algo concreto, baseado em resultado, sem precisar adotar um sistema"},
      {letra:"C",texto:"Faço ativamente — mas sinto que algo não fecha, não vira vida real"},
      {letra:"D",texto:"Tive experiências intensas e não sei o que fazer com o que ficou"},
    ]},
  { id:3, titulo:"O automático em ação",
    texto:"Quando algo bom começa a acontecer — um projeto, uma relação, uma conquista — o que aparece com mais frequência?",
    opcoes:[
      {letra:"A",texto:"Uma sabotagem que você já reconhece mas não consegue impedir"},
      {letra:"B",texto:"Ansiedade sem causa clara, como se fosse ser tirado"},
      {letra:"C",texto:"Dificuldade de sustentar — o que era bom começa a pesar"},
      {letra:"D",texto:"Flui, sem atrito — estou aqui para aprofundar o que já funciona"},
    ]},
  { id:4, titulo:"Decisões e custo",
    texto:"Como é tomar decisões importantes?",
    opcoes:[
      {letra:"A",texto:"Fico em loop — vejo os dois lados mas não consigo mover"},
      {letra:"B",texto:"Decido mas carrego o peso do que deixei de lado"},
      {letra:"C",texto:"Decido pelo impulso e depois sinto que traí alguma coisa"},
      {letra:"D",texto:"Tenho clareza mental mas o comportamento vai em outra direção"},
    ]},
  { id:5, titulo:"O que está presente agora",
    texto:"O que descreve melhor o que você carrega neste momento?",
    opcoes:[
      {letra:"A",texto:"Sei o que precisa mudar — o padrão continua operando mesmo com consciência"},
      {letra:"B",texto:"Não sei o que está bloqueando — só sei que algo está"},
      {letra:"C",texto:"Tenho muita clareza intelectual mas nada se reorganiza no concreto"},
      {letra:"D",texto:"Estou em transição e preciso de sustentação para que não reverta"},
    ]},
  { id:6, titulo:"O corpo como campo",
    texto:"Sua relação com o que o corpo sinaliza é:",
    opcoes:[
      {letra:"A",texto:"Ele avisa antes — tensão, aperto, paralisia — e a mente tenta ignorar"},
      {letra:"B",texto:"Carrega tensões que não passam mesmo com cuidado"},
      {letra:"C",texto:"Sinto desconexão — não consigo ler o que ele diz"},
      {letra:"D",texto:"Uso as sensações como informação, mas algo não se resolve"},
    ]},
  { id:7, titulo:"A evidência concreta",
    texto:"Qual é a evidência mais recente de que algo mudou de verdade na sua vida?",
    opcoes:[
      {letra:"A",texto:"Tenho transformações internas claras — o externo ainda não acompanhou"},
      {letra:"B",texto:"Consigo identificar insights mas não nomeio mudanças objetivas no cotidiano"},
      {letra:"C",texto:"Tenho mudanças concretas — e quero o que vem depois disso"},
      {letra:"D",texto:"Não estou buscando mudança — o que existe em mim quer encontrar um campo à altura"},
    ]},
  { id:8, titulo:"Interno e externo",
    texto:"Quando você olha para a sua vida concreta — relações, dinheiro, corpo, decisões — o que sente em relação ao seu estado interno?",
    opcoes:[
      {letra:"A",texto:"Há uma distância clara — internamente sou uma pessoa, externamente outra"},
      {letra:"B",texto:"Há clareza interna mas o externo ainda não acompanhou por inteiro"},
      {letra:"C",texto:"Está alinhado — e estou aqui porque quero ir mais fundo no que já funciona"},
      {letra:"D",texto:"Estou aqui por escolha, não por necessidade — o que existe em mim quer encontrar um campo à altura"},
    ]},
];

const perfis = {
  E:{nome:"Campo de profundidade",mensagem:"O que você traz não é uma crise — é uma Lente que expandiu além dos espaços que frequentava. Você tem evidência concreta de mudança. Está aqui por escolha, não por necessidade. O DVÄRA serve para quem está em movimento e quer um campo que sustente o que está acontecendo sem que o antigo consiga reverter.",indicacao:"Sessão Expansão a Seco ou Sessão Panorama para avaliar profundidade"},
  A:{nome:"Saturação com padrão reconhecido",mensagem:"A percepção chegou. O que ainda não chegou é o acesso ao nível onde o padrão opera. Você reconhece o mecanismo, já tentou mudar pela consciência e pela vontade — e o Pulso continua. Isso não é falta de esforço. É que a mudança ainda não desceu até onde precisa. É exatamente esse intervalo que o DVÄRA conduz.",indicacao:"Sessão Panorama → Pacote Medicina a Seco"},
  B:{nome:"Orientação por resultado",mensagem:"O que você busca é resultado que aparece no comportamento real — não em estados. Você não precisa de mais um sistema para acreditar. Precisa de acesso técnico preciso ao nível onde o padrão foi gravado. A Descida opera exatamente nesse nível — com protocolo certificado ISO 9001 e resultado mensurável no cotidiano.",indicacao:"Sessão Panorama com ênfase no Rastro de Coerência"},
  C:{nome:"Expansão sem aterramento",mensagem:"A abertura aconteceu. O que falta não é mais expansão — é o trabalho no nível onde o padrão vive. Você já chegou à percepção que deveria mudar tudo. E o automático continua. Não porque a experiência foi ilusão. Porque o padrão vive abaixo de onde a experiência chegou. É diferente. E é exatamente o que o DVÄRA conduz.",indicacao:"Sessão Panorama → Expansão a Seco ou Pacote"},
  D:{nome:"Em transição ativa",mensagem:"Você está em movimento. A clareza existe — o que o automático ainda não acompanhou. O DVÄRA não cria a transição: sustenta o que já está acontecendo para que o antigo consiga reverter. O que está se abrindo em você precisa de um campo que segure enquanto o novo ainda não tem raiz.",indicacao:"Sessão Expansão a Seco ou Sessão Panorama para avaliar"},
};

function determinarPerfil(r){
  const c={A:0,B:0,C:0,D:0};
  Object.values(r).forEach(x=>c[x]++);
  const q7=r[6],q8=r[7];
  if((q7==="C"||q7==="D")&&(q8==="C"||q8==="D")&&c.D>=3)
    return {chave:"E",perfil:perfis.E,c};
  const max=Math.max(...Object.values(c));
  const chave=Object.keys(c).find(k=>c[k]===max)||"A";
  return {chave,perfil:perfis[chave],c};
}

const S={
  pg:{minHeight:"100vh",background:"#080808",color:"#E8E8E8",
    fontFamily:"'Georgia','Times New Roman',serif",
    display:"flex",flexDirection:"column",alignItems:"center",
    justifyContent:"center",padding:"40px 16px"},
  lbl:{fontSize:11,letterSpacing:"0.3em",color:"#555",textTransform:"uppercase",marginBottom:28,textAlign:"center"},
  div:{width:40,height:1,background:"#222",margin:"0 auto 32px"},
};

export default function App(){
  const [etapa,setEtapa]=useState("intro");
  const [atual,setAtual]=useState(0);
  const [resp,setResp]=useState({});
  const [resultado,setResultado]=useState(null);
  const [leitura,setLeitura]=useState("");
  const [loading,setLoading]=useState(false);

  const responder=(l)=>{
    const n={...resp,[atual]:l};
    setResp(n);
    if(atual<perguntas.length-1){setTimeout(()=>setAtual(atual+1),250);}
    else{finalizar(n);}
  };

  const finalizar=async(todas)=>{
    setEtapa("interpretando");setLoading(true);
    const {chave,perfil,c}=determinarPerfil(todas);
    setResultado(perfil);
    const resumo=perguntas.map((p,i)=>{
      const l=todas[i];const op=p.opcoes.find(o=>o.letra===l);
      return `P${i+1} (${p.titulo}): ${l} — "${op?.texto}"`;
    }).join("\n");
    const prompt=`Respostas:\n${resumo}\n\nPerfil: ${perfil.nome}\nDistribuição: A=${c.A}, B=${c.B}, C=${c.C}, D=${c.D}\n\nFaça a leitura em voz DVÄRA.`;
    try{
      const r=await fetch("/api/interpret",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt,systemPrompt:SYSTEM_PROMPT}),
      });
      const d=await r.json();
      const txt=d.content?.map(x=>x.text||"").join("")||"";
      setLeitura(txt||perfil.mensagem);
    }catch{setLeitura(perfil.mensagem);}
    setLoading(false);setEtapa("resultado");
  };

  const reiniciar=()=>{setEtapa("intro");setAtual(0);setResp({});setResultado(null);setLeitura("");};

  if(etapa==="intro") return(
    <div style={S.pg}><div style={{maxWidth:520,width:"100%",textAlign:"center"}}>
      <div style={S.lbl}>DVÄRA</div>
      <h1 style={{fontSize:"clamp(22px,5vw,32px)",fontWeight:400,lineHeight:1.3,marginBottom:16,color:"#F0F0F0"}}>Mapeamento Visceral</h1>
      <div style={S.div}/>
      <p style={{fontSize:15,lineHeight:1.8,color:"#888",marginBottom:8}}>Oito perguntas. Sem certo ou errado.</p>
      <p style={{fontSize:15,lineHeight:1.8,color:"#888",marginBottom:40}}>Responda com o que vier antes da mente decidir o que deveria ser.</p>
      <button onClick={()=>setEtapa("perguntas")} style={{background:"transparent",border:"1px solid #333",color:"#AAA",padding:"14px 36px",fontSize:12,letterSpacing:"0.25em",textTransform:"uppercase",cursor:"pointer"}}>Começar</button>
    </div></div>
  );

  if(etapa==="perguntas") return(
    <div style={S.pg}><div style={{maxWidth:560,width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:44}}>
        <span style={{fontSize:11,color:"#444",letterSpacing:"0.15em"}}>{atual+1} — {perguntas.length}</span>
        <div style={{flex:1,height:1,background:"#151515",margin:"0 14px"}}>
          <div style={{height:"100%",background:"#555",width:`${(atual/perguntas.length)*100}%`,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:10,color:"#444"}}>{perguntas[atual].titulo}</span>
      </div>
      <p style={{fontSize:"clamp(16px,3vw,19px)",lineHeight:1.65,color:"#DDD",marginBottom:36}}>{perguntas[atual].texto}</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {perguntas[atual].opcoes.map(op=>(
          <button key={op.letra} onClick={()=>responder(op.letra)} style={{background:"transparent",border:"1px solid #1E1E1E",color:"#888",padding:"15px 18px",textAlign:"left",fontSize:14,lineHeight:1.6,cursor:"pointer",display:"flex",gap:14,alignItems:"flex-start",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#444";e.currentTarget.style.color="#DDD";e.currentTarget.style.background="#0D0D0D";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1E1E1E";e.currentTarget.style.color="#888";e.currentTarget.style.background="transparent";}}>
            <span style={{color:"#444",fontSize:10,minWidth:14,paddingTop:3}}>{op.letra}</span>
            <span>{op.texto}</span>
          </button>
        ))}
      </div>
    </div></div>
  );

  if(etapa==="interpretando") return(
    <div style={S.pg}><div style={S.lbl}>DVÄRA</div>
      <p style={{color:"#555",fontSize:13,letterSpacing:"0.2em"}}>lendo o campo...</p>
    </div>
  );

  if(etapa==="resultado"&&resultado) return(
    <div style={S.pg}><div style={{maxWidth:680,width:"100%"}}>
      <div style={S.lbl}>DVÄRA — LEITURA DO CAMPO</div>
      <div style={S.div}/>
      <div style={{fontSize:15,lineHeight:1.95,color:"#BBB",marginBottom:48,whiteSpace:"pre-line"}}>
        {loading?<span style={{color:"#444"}}>...</span>:leitura}
      </div>
      {!loading&&(
        <div style={{borderTop:"1px solid #161616",paddingTop:40,marginBottom:24}}>
          <p style={{fontSize:11,color:"#555",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:24,textAlign:"center"}}>Selecione sua data para a Sessão Panorama</p>
          <div style={{width:"100%",height:"600px",background:"#0d0d0d",border:"1px solid #1a1a1a",overflow:"hidden"}}>
            <iframe src={CALENDLY_LINK} width="100%" height="100%" frameBorder="0" title="Agendamento"/>
          </div>
          <div style={{textAlign:"center",marginTop:24}}>
            <button onClick={()=>setEtapa("explicativo")} style={{background:"transparent",border:"none",color:"#333",fontSize:11,letterSpacing:"0.1em",cursor:"pointer"}}>[ já agendei — continuar ]</button>
          </div>
        </div>
      )}
    </div></div>
  );

  if(etapa==="explicativo") return(
    <div style={S.pg}><div style={{maxWidth:580,width:"100%"}}>

      {/* Cabeçalho */}
      <div style={S.lbl}>DVÄRA — SESSÃO PANORAMA</div>
      <div style={S.div}/>

      {/* Copy principal — Kishotenketsu */}
      <div style={{fontSize:15,lineHeight:1.95,color:"#BBB",marginBottom:44}}>

        <p style={{marginBottom:20,color:"#D0D0D0",fontSize:16}}>
          O Mapeamento mostrou onde o Filtro opera.
        </p>

        <p style={{marginBottom:20}}>
          Reconhecer o padrão é real. E é diferente de dissolver o que o sustenta.
          A maioria das pessoas passa anos reconhecendo — e o automático continua operando no mesmo nível.
        </p>

        <p style={{marginBottom:20}}>
          Porque reconhecimento não é acesso. É a superfície do que existe abaixo.
        </p>

        <p style={{marginBottom:20,color:"#D0D0D0"}}>
          A Sessão Panorama não é conversa. Não é acolhimento. É o primeiro acesso real ao nível onde o padrão foi gravado — antes de qualquer narrativa sobre ele.
        </p>

        <p style={{marginBottom:0}}>
          Em 2 horas, o protocolo Omni ISO 9001 conduz a Descida ao ponto exato onde a crença opera. O campo de Charlotte sustenta o que se move. O que você sai carregando não é mais um insight — é o <span style={{color:"#E8E8E8"}}>Rastro de Coerência</span>: a evidência objetiva nos dias que seguem.
        </p>
      </div>

      {/* O que acontece na sessão */}
      <div style={{border:"1px solid #1A1A1A",padding:"24px",marginBottom:36}}>
        <p style={{fontSize:11,color:"#555",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>O que acontece</p>
        {[
          "Diagnóstico preciso do seu padrão específico — não genérico",
          "Descida ao nível subconsciente via protocolo certificado ISO 9001",
          "Dissolução das camadas que sustentam o padrão",
          "Mapa das próximas etapas baseado no que se revelou",
        ].map((item,i)=>(
          <div key={i} style={{display:"flex",gap:14,marginBottom:14,alignItems:"flex-start"}}>
            <span style={{color:"#444",fontSize:10,paddingTop:4,minWidth:8}}>—</span>
            <span style={{fontSize:14,color:"#999",lineHeight:1.6}}>{item}</span>
          </div>
        ))}
      </div>

      {/* Detalhes */}
      <div style={{borderTop:"1px solid #161616",paddingTop:24,marginBottom:40}}>
        {[
          ["Duração","2 horas"],
          ["Formato","Individual · Online · Sala Privada"],
          ["Quando","Na data que você agendou"],
          ["Investimento","R$ 222"],
        ].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <span style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em"}}>{k}</span>
            <span style={{fontSize:14,color:"#999"}}>{v}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{textAlign:"center"}}>
        <p style={{fontSize:13,color:"#666",marginBottom:20,lineHeight:1.7}}>
          O agendamento está confirmado.<br/>
          O pagamento garante a sua sessão.
        </p>
        <a href={TICTO_LINK} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block",background:"#E8E8E8",color:"#080808",
            padding:"18px 48px",fontSize:12,letterSpacing:"0.25em",
            textTransform:"uppercase",textDecoration:"none",fontWeight:"bold",
            marginBottom:32}}>
          Garantir minha Sessão · R$ 222
        </a>

        {/* Âncoras de confiança */}
        <div style={{display:"flex",justifyContent:"center",gap:32,flexWrap:"wrap",marginBottom:24}}>
          {["Protocolo ISO 9001","Pagamento seguro via Ticto","Online · Sala privada"].map(t=>(
            <span key={t} style={{fontSize:11,color:"#444",letterSpacing:"0.05em"}}>✓ {t}</span>
          ))}
        </div>

        <button onClick={reiniciar}
          style={{background:"transparent",border:"none",color:"#2A2A2A",
            fontSize:11,letterSpacing:"0.15em",cursor:"pointer"}}>
          refazer mapeamento
        </button>
      </div>

    </div></div>
  );
  return null;
}
