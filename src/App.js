import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = cleanForm();
  }
  render() {
    const { area, roof, paved, grass, roofCoef, pavedCoef, grassCoef, porousAsphault, porousAsphaultCoef, undevelopedArea, undevelopedAreaCoef, borough, i } = this.state;
    const Cw = round( (roof*roofCoef + paved*pavedCoef + grass*grassCoef + porousAsphault*porousAsphaultCoef + undevelopedArea*undevelopedAreaCoef)/area );
    const Qall = round( area*1000 * boroughs[borough] / 43560 );
    const developedFlow = round( area*1000*Cw*i / 43560 );
    const Qo = round( Qall/(round(area*0.0229568)*Cw) );
    const tVariable = round(Math.pow( 12600/Qo, 0.5)*0.5 - 15);
    const VVariable = round( ( 8400*tVariable/(tVariable + 15) - 40*tVariable*Qo )*round(area*0.0229568)*Cw);
    const tConstant = round(Math.pow( 8400/Qo, 0.5)*0.5 - 15);
    const VConstant = round( ( 8400*tConstant/(tConstant + 15) - 60*tConstant*Qo )*round(area*0.0229568)*Cw);
    return (
      <div className="container">
        <h1 style={{textAlign: "center"}} >Detention Facility Volume Calculator</h1>
        <hr/>

{/* INPUTS */}
        <h3 style={{textAlign: "center", marginBottom: "30px"}}> Inputs </h3>

        <div className="row" style={{textAlign: "center"}}>
          <p style={{background: "tomato", padding: "5px 10px", color: "white"}} className="four columns u-full-width"> please input areas in 1,000 sq.ft. units </p>
        </div>
        <div className="row" style={{textAlign: "center"}}>
          <p style={{background: "tomato", padding: "5px 10px", color: "white"}} className="four columns u-full-width"> <b>example:</b> 93,200 sq.ft = 93.2 </p>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={activeLabel}> Area </span>
          <input type="number" className="five columns" value={area} onChange={ e => this.setState({ area: e.target.value }) } />
          <span className="two columns u-full-width" style={label}> acres </span>
          <input type="number" className="three columns" value={round(area*0.0229568)} disabled={true} />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Roof </span>
          <input type="number" className="five columns" value={roof} onChange={ e => this.setState({ roof: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns" value={roofCoef} onChange={ e => this.setState({ roofCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Paved </span>
          <input type="number" className="five columns" value={paved} onChange={ e => this.setState({ paved: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns" value={pavedCoef} onChange={ e => this.setState({ pavedCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Porous Asphault </span>
          <input type="number" className="five columns" value={porousAsphault} onChange={ e => this.setState({ porousAsphault: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns" value={porousAsphaultCoef} onChange={ e => this.setState({ porousAsphaultCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Undeveloped </span>
          <input type="number" className="five columns" value={undevelopedArea} onChange={ e => this.setState({ undevelopedArea: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns" value={undevelopedAreaCoef} onChange={ e => this.setState({ undevelopedAreaCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Grass </span>
          <input type="number" className="five columns" value={grass} onChange={ e => this.setState({ grass: e.target.value }) } />
          <span className="two columns u-full-width" style={activeLabel}> runoff coef </span>
          <input type="number" className="three columns" value={grassCoef} onChange={ e => this.setState({ grassCoef: e.target.value }) } />
        </div>

        <div className="row">
          <span className="two columns u-full-width" style={activeLabel}> Borough </span>
          <select className="five columns u-full-width" value={borough} onChange={ e => this.setState({ borough: e.target.value }) }>
            <option value="brooklyn"> Brooklyn </option>
            <option value="queens"> Queens </option>
            <option value="bronxPre"> Bronx-pre 1964 </option>
            <option value="bronxPost"> Bronx-post 1964 </option>
          </select>
          <span className="two columns u-full-width" style={label}> coefficient </span>
          <input type="text" className="three columns" value={boroughs[borough]}  />
        </div>

        <hr/>

{/* OUTPUTS */}
        <h3 style={{textAlign: "center", marginBottom: "30px"}}> Outputs </h3>
        
        <div className="row">
          <span className="two columns u-full-width"  style={label}> Cw </span>
          <input type="number" className="five columns"  disabled={true} value={Cw}/>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> Qall </span>
          <input type="number" className="five columns"  disabled={true} value={Qall}/>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> Developed Flow </span>
          <input type="number" className="five columns"  disabled={true} value={developedFlow}/>
        </div>

          { 
            developedFlow > Qall ?
            <div className="row">
              <p style={{background: "tomato", padding: "5px 10px", color: "white", borderRadius: "2px"}} className="seven columns u-full-width"> Developed Flow ({developedFlow}) > Cw ({Cw}) - Flow must be restricted </p>
            </div>: null
          }

        <div className="row">
          <span className="two columns u-full-width"  style={label}> Qo </span>
          <input type="number" className="five columns"  disabled={true} value={Qo}/>
        </div>

{/* Variable Outflow */}
        <div className="row">
        <p className="twelve columns u-full-width"> Outflow will be controlled by an orifice and will <b>vary</b> with the depth of storage: </p>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> t (min.) </span>
          <input type="number" className="five columns"  disabled={true} value={ tVariable }/>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> V (ft^3) </span>
          <input type="number" className="five columns"  disabled={true} value={ VVariable }/>
        </div>

{/* Constant Outflow */}
        <div className="row">
        <p className="twelve columns u-full-width"> Outflow will be <b>constant</b> and will not vary with the depth of storage: </p>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> t (min.) </span>
          <input type="number" className="five columns"  disabled={true} value={ tConstant }/>
        </div>

        <div className="row">
          <span className="two columns u-full-width"  style={label}> V (ft^3) </span>
          <input type="number" className="five columns"  disabled={true} value={ VConstant }/>
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
  , borderRadius: "2px"
  , padding: "3px"
  , boxSizing: "border-box"
}

const activeLabel = {
    background: "#6db2df" 
  , color: "white" 
  , textAlign: "center"
  , height: "38px"
  , borderRadius: "2px"
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
    , borough: "brooklyn"
    , i: 5.95
    , round: 3
  }
}

const boroughs = {
    brooklyn: 0.5*5
  , queens: 0.5*4.8
  , bronxPre: 0.44*4
  , bronxPost: 0.75*4
}

function round(number) {
  return Math.round(number*1000)/1000;
}