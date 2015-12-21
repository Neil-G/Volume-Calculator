import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = cleanForm();
  }
  render() {
    const { decimals, area, roof, paved, grass, roofCoef, pavedCoef, grassCoef, porousAsphault, porousAsphaultCoef, undevelopedArea, undevelopedAreaCoef, borough, i } = this.state;
    const Cw = round( (roof*roofCoef + paved*pavedCoef + grass*grassCoef + porousAsphault*porousAsphaultCoef + undevelopedArea*undevelopedAreaCoef)/area, decimals );
    const Qall = round( area*1000 * boroughs[borough] / 43560, decimals );
    const developedFlow = round( area*1000*Cw*i / 43560, decimals );
    const Qo = round( Qall/(round(area*0.0229568, decimals)*Cw), decimals );
    const tVariable = round(Math.pow( 12600/Qo, 0.5)*0.5 - 15, decimals);
    const VVariable = round( ( 8400*tVariable/(tVariable + 15) - 40*tVariable*Qo )*round(area*0.0229568, decimals)*Cw, decimals);
    const tConstant = round(Math.pow( 8400/Qo, 0.5)*0.5 - 15, decimals );
    const VConstant = round( ( 8400*tConstant/(tConstant + 15) - 60*tConstant*Qo )*round(area*0.0229568, decimals)*Cw, decimals);
    console.log(this.state)
    return (
      <div className="container">
        <h1 style={{textAlign: "center", background: "black", color: "white", padding: "15px"}} >Detention Facility Volume Calculator</h1>
        <hr/>



{/* Warnings */}
        <h3 style={{textAlign: "center", marginBottom: "30px", background: "#EF6C00", color: "white"}}> Instructions </h3>
        <div className="row" style={{textAlign: "center"}}>
          <p style={{background: "#6db2df", padding: "5px 10px", color: "white", border: "5px double black"}} className="six columns u-full-width offset-by-three"> Boxes with this color heading can be changed directly </p>
        </div>
        <div className="row" style={{textAlign: "center"}}>
          <p style={{background: "gray", padding: "5px 10px", color: "white", border: "5px double black"}} className="six columns u-full-width offset-by-three"> Boxes with this color heading are calculations and cannot be changed directly </p>
        </div>
        <div className="row" style={{textAlign: "center"}}>
          <p style={{background: "tomato", padding: "5px 10px", color: "white", border: "5px double black"}} className="six columns u-full-width offset-by-three"> please input areas in 1,000 sq.ft. units <br/> <b>example:</b> 93,200 sq.ft. = 93.2 </p>
        </div>
        
      
        

{/* INPUTS */}
        <h3 style={{textAlign: "center", marginBottom: "30px", background: "#EF6C00", color: "white"}}> Inputs </h3>

        <div className="row">
          <span className="two columns u-full-width"  style={activeLabel}> Decimals </span>
          <input type="number" className="three columns" value={decimals} onChange={ e => this.setState({ decimals: e.target.value })} />
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={activeLabel}> Area <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={area} onChange={ e => this.setState({ area: e.target.value }) } />
          <span className="two columns u-full-width" style={label}> acres </span>
          <input type="number" className="three columns center-text" value={round(area*0.0229568, decimals)} disabled={true} />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Roof <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={roof} onChange={ e => this.setState({ roof: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns center-text" value={roofCoef} onChange={ e => this.setState({ roofCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Paved <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={paved} onChange={ e => this.setState({ paved: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns center-text" value={pavedCoef} onChange={ e => this.setState({ pavedCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Porous Asphault <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={porousAsphault} onChange={ e => this.setState({ porousAsphault: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns center-text" value={porousAsphaultCoef} onChange={ e => this.setState({ porousAsphaultCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Undeveloped <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={undevelopedArea} onChange={ e => this.setState({ undevelopedArea: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns center-text" value={undevelopedAreaCoef} onChange={ e => this.setState({ undevelopedAreaCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Grass <span style={{ fontSize: "0.7em"}}> (1000 sq.ft.)</span></span>
          <input type="number" className="five columns center-text" value={grass} onChange={ e => this.setState({ grass: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns center-text" value={grassCoef} onChange={ e => this.setState({ grassCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Borough </span>
          <select className="five columns u-full-width center-text" value={borough} onChange={ e => this.setState({ borough: e.target.value }) }>
            <option value={undefined}> please choose a borough </option>
            <option value="brooklyn"> Brooklyn </option>
            <option value="queens"> Queens </option>
            <option value="bronxPre"> Bronx-pre 1964 </option>
            <option value="bronxPost"> Bronx-post 1964 </option>
          </select>
          <span className="two columns u-full-width" style={label}> coefficient </span>
          <input type="text" className="three columns center-text" value={boroughs[borough]}  />
        </div>

        <hr/>

{/* OUTPUTS */}
        <h3 style={{textAlign: "center", marginBottom: "30px", background: "#EF6C00", color: "white"}}> Outputs </h3>
        
        <div className="row" style={{textAlign: "center"}}>
          <span className="two columns u-full-width offset-by-three"  style={label}> Cw </span>
          <input type="number" className="four columns"  disabled={true} value={Cw}/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
          ( {String(roof)}*{String(roofCoef)} + {String(paved)}*{String(pavedCoef)} + {String(porousAsphault)}*{String(porousAsphaultCoef)} + {String(undevelopedArea)}*{String(undevelopedAreaCoef)} + {String(grass)}*{String(grassCoef)}) / {String(area)} = {Cw}
          </span>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> Qall <span style={{fontSize: "0.6em"}}> (cfs) </span></span>
          <input type="number" className="four columns"  disabled={true} value={Qall}/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
          {area} * {1000} * {boroughs[borough]} / {43560} = {Qall}
          </span>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> Developed Flow <span style={{fontSize: "0.6em"}}> (cfs) </span></span>
          <input type="number" className="four columns"  disabled={true} value={developedFlow}/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
          {area} * {1000} * {Cw} * {i} / 43560 = {developedFlow}
          </span>
        </div>

          { 
            developedFlow > Qall ?
            <div className="row">
              <p style={{background: "tomato", padding: "5px 10px", color: "white", borderRadius: "2px"}} className="six columns u-full-width  offset-by-three"> Developed Flow ({developedFlow}<span style={{fontSize: "0.6em"}}> cfs </span>) > Qall ({Qall}<span style={{fontSize: "0.6em"}}> cfs </span>) - Flow must be restricted </p>
            </div>: null
          }

        <div className="row">
          <span className="two columns u-full-width  offset-by-three"  style={label}> Qo </span>
          <input type="number" className="four columns"  disabled={true} value={Qo}/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
          {Qall} / ({round(area*0.0229568, decimals)}*{Cw}) = {Qo}
          </span>
        </div>

        

{/* Variable Outflow */}
        <div className="row">
        <p className="twelve columns u-full-width offset-by-three"> Outflow will be controlled by an orifice and will <b>vary</b> with the depth of storage: </p>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> t (min.) </span>
          <input type="number" className="four columns"  disabled={true} value={ tVariable }/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
            (0.5)*(12600/{Qo})^.5) - 15 = { tVariable }
          </span>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> V (ft^3) </span>
          <input type="number" className="four columns"  disabled={true} value={ VVariable }/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
            [ 8400 * {tVariable} / ({tVariable} + 15) - 40 * {tVariable}*{Qo} )] * {round(area*0.0229568, decimals)} * {Cw} = { VVariable }
          </span>
        </div>

{/* Constant Outflow */}
        <div className="row">
        <p className="twelve columns u-full-width offset-by-three"> Outflow will be <b>constant</b> and will not vary with the depth of storage: </p>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> t (min.) </span>
          <input type="number" className="four columns"  disabled={true} value={ tConstant }/>
        </div>

        <div className="row">
          <span className="twelve columns u-full-width offset-by-three" style={{marginBottom: "15px"}}> 
            (0.5)*(8400/{Qo})^.5) - 15 = { tConstant } 
          </span>
        </div>

        <div className="row">
          <span className="two columns u-full-width offset-by-three"  style={label}> V (ft^3) </span>
          <input type="number" className="four columns"  disabled={true} value={ VConstant }/>
        </div>

        <div className="row" >
          <span className="twelve columns u-full-width offset-by-three"> 
            [ 8400 * {tConstant} / ({tConstant} + 15) - 60 * {tConstant}*{Qo} )] * {round(area*0.0229568, decimals)} * {Cw} = { VConstant }
          </span>
        </div>
      </div>
    );
  }
}

const label = {
    background: "gray" 
  , color: "white" 
  , textAlign: "center"
  , height: "38px"
  // , borderRadius: "2px"
  , padding: "3px"
  , boxSizing: "border-box"
}

const activeLabel = {
    background: "#6db2df" 
  , color: "white" 
  , textAlign: "center"
  , height: "38px"
  // , borderRadius: "2px"
  , padding: "3px"
  , boxSizing: "border-box"
}


function cleanForm() {
  return {
      area: 0
    , roof: 0
    , roofCoef: 1
    , paved: 0 
    , pavedCoef: 0.85
    , porousAsphault: 0
    , porousAsphaultCoef: 0.75
    , undevelopedArea: 0
    , undevelopedAreaCoef: 0.3
    , grass: 0
    , grassCoef: 0.2
    , borough: undefined
    , i: 5.95
    , round: 3
    , decimals: 3
  }
}

const boroughs = {
    brooklyn: 0.5*5
  , queens: 0.5*4.8
  , bronxPre: 0.44*4
  , bronxPost: 0.75*4
}

function round(number, decimals) {
  const factor = Math.pow(10, decimals)
  return Math.round(number*factor)/factor;
}