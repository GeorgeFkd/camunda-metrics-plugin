export const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_1tf171l" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.4.2" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.18.0">
  <bpmn:process id="Process_1qc7ec5" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="START EVENT">
      <bpmn:outgoing>Flow_12dp2as</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_0imn65r" name="BEGIN PASSENGER CHECK IN PROGRESS">
      <bpmn:incoming>Flow_12dp2as</bpmn:incoming>
      <bpmn:outgoing>Flow_0o3xnww</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_12dp2as" sourceRef="StartEvent_1" targetRef="Activity_0imn65r" />
    <bpmn:task id="Activity_1kb0ki9" name="PROMPT TRAVELER TO SCAN PRE-PURCHASED TICKET">
      <bpmn:incoming>Flow_0o3xnww</bpmn:incoming>
      <bpmn:outgoing>Flow_1fh47js</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0o3xnww" sourceRef="Activity_0imn65r" targetRef="Activity_1kb0ki9" />
    <bpmn:task id="Activity_1o5ln79" name="SCAN TICKET">
      <bpmn:incoming>Flow_1fh47js</bpmn:incoming>
      <bpmn:outgoing>Flow_1mzfe43</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1fh47js" sourceRef="Activity_1kb0ki9" targetRef="Activity_1o5ln79" />
    <bpmn:sequenceFlow id="Flow_1mzfe43" sourceRef="Activity_1o5ln79" targetRef="Gateway_0eehrky" />
    <bpmn:inclusiveGateway id="Gateway_0jy5vpv">
      <bpmn:incoming>Flow_0mtwbwe</bpmn:incoming>
      <bpmn:outgoing>Flow_1tumju7</bpmn:outgoing>
      <bpmn:outgoing>Flow_0dbphlp</bpmn:outgoing>
      <bpmn:outgoing>Flow_12ryzn5</bpmn:outgoing>
    </bpmn:inclusiveGateway>
    <bpmn:task id="Activity_06w9b0b" name="TRACK CHANGE IN NUMBER OF BAGS">
      <bpmn:incoming>Flow_1tumju7</bpmn:incoming>
      <bpmn:outgoing>Flow_1eut3qc</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1tumju7" sourceRef="Gateway_0jy5vpv" targetRef="Activity_06w9b0b" />
    <bpmn:sequenceFlow id="Flow_0mtwbwe" sourceRef="Gateway_0eehrky" targetRef="Gateway_0jy5vpv" />
    <bpmn:task id="Activity_0tw55rx" name="TRACK CHANGE IN FLIGHT">
      <bpmn:incoming>Flow_0dbphlp</bpmn:incoming>
      <bpmn:outgoing>Flow_12l73dt</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0dbphlp" sourceRef="Gateway_0jy5vpv" targetRef="Activity_0tw55rx" />
    <bpmn:task id="Activity_010hht3" name="TRACK SEAT CHANGE">
      <bpmn:incoming>Flow_12ryzn5</bpmn:incoming>
      <bpmn:outgoing>Flow_0rst36m</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_12ryzn5" sourceRef="Gateway_0jy5vpv" targetRef="Activity_010hht3" />
    <bpmn:sequenceFlow id="Flow_1eut3qc" sourceRef="Activity_06w9b0b" targetRef="Gateway_01s7tsv" />
    <bpmn:inclusiveGateway id="Gateway_01s7tsv">
      <bpmn:incoming>Flow_1eut3qc</bpmn:incoming>
      <bpmn:incoming>Flow_0rst36m</bpmn:incoming>
      <bpmn:incoming>Flow_12l73dt</bpmn:incoming>
      <bpmn:outgoing>Flow_0a6ml32</bpmn:outgoing>
    </bpmn:inclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0rst36m" sourceRef="Activity_010hht3" targetRef="Gateway_01s7tsv" />
    <bpmn:sequenceFlow id="Flow_12l73dt" sourceRef="Activity_0tw55rx" targetRef="Gateway_01s7tsv" />
    <bpmn:sequenceFlow id="Flow_0a6ml32" sourceRef="Gateway_01s7tsv" targetRef="Gateway_1g6fzk8" />
    <bpmn:task id="Activity_16v178r">
      <bpmn:incoming>Flow_06srfp9</bpmn:incoming>
      <bpmn:outgoing>Flow_078a43u</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_06srfp9" sourceRef="Gateway_0eehrky" targetRef="Activity_16v178r" />
    <bpmn:sequenceFlow id="Flow_078a43u" sourceRef="Activity_16v178r" targetRef="Gateway_1g6fzk8" />
    <bpmn:sequenceFlow id="Flow_0dustdf" sourceRef="Gateway_1g6fzk8" targetRef="Event_1b38bxc" />
    <bpmn:intermediateThrowEvent id="Event_1b38bxc" name="A">
      <bpmn:incoming>Flow_0dustdf</bpmn:incoming>
      <bpmn:linkEventDefinition id="LinkEventDefinition_1nggmxo" name="" />
    </bpmn:intermediateThrowEvent>
    <bpmn:intermediateCatchEvent id="Event_056ix20" name="A">
      <bpmn:outgoing>Flow_19wmgrs</bpmn:outgoing>
      <bpmn:linkEventDefinition id="LinkEventDefinition_1jsd814" name="" />
    </bpmn:intermediateCatchEvent>
    <bpmn:task id="Activity_01xu5kz" name="PROMPT PRESENT ID">
      <bpmn:incoming>Flow_19wmgrs</bpmn:incoming>
      <bpmn:outgoing>Flow_1et9gme</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_19wmgrs" sourceRef="Event_056ix20" targetRef="Activity_01xu5kz" />
    <bpmn:task id="Activity_0gfypef" name="VALIDATE IDENTITY BY SCANNING ID">
      <bpmn:incoming>Flow_1et9gme</bpmn:incoming>
      <bpmn:outgoing>Flow_0qbujtl</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1et9gme" sourceRef="Activity_01xu5kz" targetRef="Activity_0gfypef" />
    <bpmn:task id="Activity_0dx6blc" name="PRINT BOARDING PASS AND BAG TAGS">
      <bpmn:incoming>Flow_0qbujtl</bpmn:incoming>
      <bpmn:outgoing>Flow_0p71jvh</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0qbujtl" sourceRef="Activity_0gfypef" targetRef="Activity_0dx6blc" />
    <bpmn:task id="Activity_17yf51s" name="CHECK IN PASSENGER">
      <bpmn:incoming>Flow_0p71jvh</bpmn:incoming>
      <bpmn:outgoing>Flow_0ijx9p8</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0p71jvh" sourceRef="Activity_0dx6blc" targetRef="Activity_17yf51s" />
    <bpmn:task id="Activity_1stxexl" name="PROCEED TO ATTENDANT">
      <bpmn:incoming>Flow_0ijx9p8</bpmn:incoming>
      <bpmn:outgoing>Flow_0w9ckpf</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0ijx9p8" sourceRef="Activity_17yf51s" targetRef="Activity_1stxexl" />
    <bpmn:task id="Activity_1caslxy" name="VALIDATE PASSENGER TICKET">
      <bpmn:incoming>Flow_0w9ckpf</bpmn:incoming>
      <bpmn:outgoing>Flow_1rbl1wi</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0w9ckpf" sourceRef="Activity_1stxexl" targetRef="Activity_1caslxy" />
    <bpmn:task id="Activity_0b1wokh" name="VALIDATE PASSENGER IDENTITY">
      <bpmn:incoming>Flow_1rbl1wi</bpmn:incoming>
      <bpmn:outgoing>Flow_1pwyhsu</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1rbl1wi" sourceRef="Activity_1caslxy" targetRef="Activity_0b1wokh" />
    <bpmn:task id="Activity_1bhklm0" name="WEIGH PASSENGER BAGGAGE">
      <bpmn:incoming>Flow_1pwyhsu</bpmn:incoming>
      <bpmn:outgoing>Flow_0h2y5zr</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1pwyhsu" sourceRef="Activity_0b1wokh" targetRef="Activity_1bhklm0" />
    <bpmn:sequenceFlow id="Flow_0h2y5zr" sourceRef="Activity_1bhklm0" targetRef="Event_19ixu2n" />
    <bpmn:intermediateThrowEvent id="Event_19ixu2n" name="B">
      <bpmn:incoming>Flow_0h2y5zr</bpmn:incoming>
      <bpmn:linkEventDefinition id="LinkEventDefinition_0s0xydv" name="" />
    </bpmn:intermediateThrowEvent>
    <bpmn:intermediateCatchEvent id="Event_1ss1ht2" name="B">
      <bpmn:outgoing>Flow_0lnr1ol</bpmn:outgoing>
      <bpmn:linkEventDefinition id="LinkEventDefinition_1yfa4wa" name="" />
    </bpmn:intermediateCatchEvent>
    <bpmn:exclusiveGateway id="Gateway_12gcjh8">
      <bpmn:incoming>Flow_0lnr1ol</bpmn:incoming>
      <bpmn:outgoing>Flow_0kycpkj</bpmn:outgoing>
      <bpmn:outgoing>Flow_10bts13</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0lnr1ol" sourceRef="Event_1ss1ht2" targetRef="Gateway_12gcjh8" />
    <bpmn:task id="Activity_0jxib3b" name="PROCESS PAYMENT">
      <bpmn:incoming>Flow_0kycpkj</bpmn:incoming>
      <bpmn:outgoing>Flow_048jl7y</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0kycpkj" name="WITHIN WEIGHT LIMIT TAG TO BAGGAGE" sourceRef="Gateway_12gcjh8" targetRef="Activity_0jxib3b" />
    <bpmn:task id="Activity_0ot83vp" name="PROMPT OVERWEIGHT BAGGAGE FEE">
      <bpmn:incoming>Flow_10bts13</bpmn:incoming>
      <bpmn:outgoing>Flow_10h6iwb</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_10bts13" name="OVER WEIGHT LIMIT" sourceRef="Gateway_12gcjh8" targetRef="Activity_0ot83vp" />
    <bpmn:task id="Activity_1qla22r" name="TAG BAGS">
      <bpmn:incoming>Flow_048jl7y</bpmn:incoming>
      <bpmn:outgoing>Flow_0njmbxs</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_048jl7y" sourceRef="Activity_0jxib3b" targetRef="Activity_1qla22r" />
    <bpmn:exclusiveGateway id="Gateway_0qkojfl">
      <bpmn:incoming>Flow_0njmbxs</bpmn:incoming>
      <bpmn:incoming>Flow_10h6iwb</bpmn:incoming>
      <bpmn:outgoing>Flow_16ix63f</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0njmbxs" sourceRef="Activity_1qla22r" targetRef="Gateway_0qkojfl" />
    <bpmn:sequenceFlow id="Flow_10h6iwb" sourceRef="Activity_0ot83vp" targetRef="Gateway_0qkojfl" />
    <bpmn:task id="Activity_1yt7les" name="CHECK BAGS">
      <bpmn:incoming>Flow_16ix63f</bpmn:incoming>
      <bpmn:outgoing>Flow_0or03pa</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_16ix63f" sourceRef="Gateway_0qkojfl" targetRef="Activity_1yt7les" />
    <bpmn:task id="Activity_0pl8e88" name="PROCEED TO SECURITY CONTROL">
      <bpmn:incoming>Flow_0or03pa</bpmn:incoming>
      <bpmn:outgoing>Flow_0sfkoi7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0or03pa" sourceRef="Activity_1yt7les" targetRef="Activity_0pl8e88" />
    <bpmn:endEvent id="Event_16ajpil" name="END EVENT">
      <bpmn:incoming>Flow_0sfkoi7</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0sfkoi7" sourceRef="Activity_0pl8e88" targetRef="Event_16ajpil" />
    <bpmn:complexGateway id="Gateway_0eehrky">
      <bpmn:incoming>Flow_1mzfe43</bpmn:incoming>
      <bpmn:outgoing>Flow_0mtwbwe</bpmn:outgoing>
      <bpmn:outgoing>Flow_06srfp9</bpmn:outgoing>
    </bpmn:complexGateway>
    <bpmn:complexGateway id="Gateway_1g6fzk8">
      <bpmn:incoming>Flow_0a6ml32</bpmn:incoming>
      <bpmn:incoming>Flow_078a43u</bpmn:incoming>
      <bpmn:outgoing>Flow_0dustdf</bpmn:outgoing>
    </bpmn:complexGateway>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1qc7ec5">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="339" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="160" y="382" width="75" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0imn65r_di" bpmnElement="Activity_0imn65r">
        <dc:Bounds x="270" y="317" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1kb0ki9_di" bpmnElement="Activity_1kb0ki9">
        <dc:Bounds x="430" y="317" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1o5ln79_di" bpmnElement="Activity_1o5ln79">
        <dc:Bounds x="590" y="317" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0dg6pa1_di" bpmnElement="Gateway_0jy5vpv">
        <dc:Bounds x="875" y="225" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_06w9b0b_di" bpmnElement="Activity_06w9b0b">
        <dc:Bounds x="1000" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0tw55rx_di" bpmnElement="Activity_0tw55rx">
        <dc:Bounds x="1000" y="320" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_010hht3_di" bpmnElement="Activity_010hht3">
        <dc:Bounds x="1000" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1crjw5e_di" bpmnElement="Gateway_01s7tsv">
        <dc:Bounds x="1175" y="225" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_16v178r_di" bpmnElement="Activity_16v178r">
        <dc:Bounds x="1000" y="420" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_05u6a0u_di" bpmnElement="Event_1b38bxc">
        <dc:Bounds x="1442" y="352" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1456" y="395" width="8" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1to1n79_di" bpmnElement="Event_056ix20">
        <dc:Bounds x="172" y="542" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="186" y="585" width="8" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_01xu5kz_di" bpmnElement="Activity_01xu5kz">
        <dc:Bounds x="260" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0gfypef_di" bpmnElement="Activity_0gfypef">
        <dc:Bounds x="420" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0dx6blc_di" bpmnElement="Activity_0dx6blc">
        <dc:Bounds x="580" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_17yf51s_di" bpmnElement="Activity_17yf51s">
        <dc:Bounds x="740" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1stxexl_di" bpmnElement="Activity_1stxexl">
        <dc:Bounds x="900" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1caslxy_di" bpmnElement="Activity_1caslxy">
        <dc:Bounds x="1060" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0b1wokh_di" bpmnElement="Activity_0b1wokh">
        <dc:Bounds x="1220" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1bhklm0_di" bpmnElement="Activity_1bhklm0">
        <dc:Bounds x="1380" y="520" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0kimbj2_di" bpmnElement="Event_19ixu2n">
        <dc:Bounds x="1542" y="542" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1556" y="585" width="8" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_09b6exy_di" bpmnElement="Event_1ss1ht2">
        <dc:Bounds x="172" y="742" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="186" y="785" width="8" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_12gcjh8_di" bpmnElement="Gateway_12gcjh8" isMarkerVisible="true">
        <dc:Bounds x="265" y="735" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0jxib3b_di" bpmnElement="Activity_0jxib3b">
        <dc:Bounds x="400" y="630" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ot83vp_di" bpmnElement="Activity_0ot83vp">
        <dc:Bounds x="480" y="810" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1qla22r_di" bpmnElement="Activity_1qla22r">
        <dc:Bounds x="590" y="630" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0qkojfl_di" bpmnElement="Gateway_0qkojfl" isMarkerVisible="true">
        <dc:Bounds x="785" y="735" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1yt7les_di" bpmnElement="Activity_1yt7les">
        <dc:Bounds x="930" y="720" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0pl8e88_di" bpmnElement="Activity_0pl8e88">
        <dc:Bounds x="1130" y="720" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_16ajpil_di" bpmnElement="Event_16ajpil">
        <dc:Bounds x="1332" y="742" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1318" y="785" width="64" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1q6e032_di" bpmnElement="Gateway_0eehrky">
        <dc:Bounds x="755" y="332" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0wlinwj_di" bpmnElement="Gateway_1g6fzk8">
        <dc:Bounds x="1305" y="345" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_12dp2as_di" bpmnElement="Flow_12dp2as">
        <di:waypoint x="215" y="357" />
        <di:waypoint x="270" y="357" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0o3xnww_di" bpmnElement="Flow_0o3xnww">
        <di:waypoint x="370" y="357" />
        <di:waypoint x="430" y="357" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1fh47js_di" bpmnElement="Flow_1fh47js">
        <di:waypoint x="530" y="357" />
        <di:waypoint x="590" y="357" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1mzfe43_di" bpmnElement="Flow_1mzfe43">
        <di:waypoint x="690" y="357" />
        <di:waypoint x="755" y="357" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1tumju7_di" bpmnElement="Flow_1tumju7">
        <di:waypoint x="925" y="250" />
        <di:waypoint x="1000" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0mtwbwe_di" bpmnElement="Flow_0mtwbwe">
        <di:waypoint x="780" y="332" />
        <di:waypoint x="780" y="250" />
        <di:waypoint x="875" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0dbphlp_di" bpmnElement="Flow_0dbphlp">
        <di:waypoint x="900" y="275" />
        <di:waypoint x="900" y="360" />
        <di:waypoint x="1000" y="360" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12ryzn5_di" bpmnElement="Flow_12ryzn5">
        <di:waypoint x="900" y="225" />
        <di:waypoint x="900" y="120" />
        <di:waypoint x="1000" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1eut3qc_di" bpmnElement="Flow_1eut3qc">
        <di:waypoint x="1100" y="250" />
        <di:waypoint x="1175" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0rst36m_di" bpmnElement="Flow_0rst36m">
        <di:waypoint x="1100" y="120" />
        <di:waypoint x="1200" y="120" />
        <di:waypoint x="1200" y="225" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12l73dt_di" bpmnElement="Flow_12l73dt">
        <di:waypoint x="1100" y="360" />
        <di:waypoint x="1200" y="360" />
        <di:waypoint x="1200" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0a6ml32_di" bpmnElement="Flow_0a6ml32">
        <di:waypoint x="1225" y="250" />
        <di:waypoint x="1330" y="250" />
        <di:waypoint x="1330" y="345" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06srfp9_di" bpmnElement="Flow_06srfp9">
        <di:waypoint x="780" y="382" />
        <di:waypoint x="780" y="460" />
        <di:waypoint x="1000" y="460" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_078a43u_di" bpmnElement="Flow_078a43u">
        <di:waypoint x="1100" y="460" />
        <di:waypoint x="1330" y="460" />
        <di:waypoint x="1330" y="395" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0dustdf_di" bpmnElement="Flow_0dustdf">
        <di:waypoint x="1355" y="370" />
        <di:waypoint x="1442" y="370" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19wmgrs_di" bpmnElement="Flow_19wmgrs">
        <di:waypoint x="208" y="560" />
        <di:waypoint x="260" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1et9gme_di" bpmnElement="Flow_1et9gme">
        <di:waypoint x="360" y="560" />
        <di:waypoint x="420" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0qbujtl_di" bpmnElement="Flow_0qbujtl">
        <di:waypoint x="520" y="560" />
        <di:waypoint x="580" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0p71jvh_di" bpmnElement="Flow_0p71jvh">
        <di:waypoint x="680" y="560" />
        <di:waypoint x="740" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ijx9p8_di" bpmnElement="Flow_0ijx9p8">
        <di:waypoint x="840" y="560" />
        <di:waypoint x="900" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0w9ckpf_di" bpmnElement="Flow_0w9ckpf">
        <di:waypoint x="1000" y="560" />
        <di:waypoint x="1060" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1rbl1wi_di" bpmnElement="Flow_1rbl1wi">
        <di:waypoint x="1160" y="560" />
        <di:waypoint x="1220" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1pwyhsu_di" bpmnElement="Flow_1pwyhsu">
        <di:waypoint x="1320" y="560" />
        <di:waypoint x="1380" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0h2y5zr_di" bpmnElement="Flow_0h2y5zr">
        <di:waypoint x="1480" y="560" />
        <di:waypoint x="1542" y="560" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0lnr1ol_di" bpmnElement="Flow_0lnr1ol">
        <di:waypoint x="208" y="760" />
        <di:waypoint x="265" y="760" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0kycpkj_di" bpmnElement="Flow_0kycpkj">
        <di:waypoint x="290" y="735" />
        <di:waypoint x="290" y="670" />
        <di:waypoint x="400" y="670" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="296" y="710" width="87" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10bts13_di" bpmnElement="Flow_10bts13">
        <di:waypoint x="290" y="785" />
        <di:waypoint x="290" y="850" />
        <di:waypoint x="480" y="850" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="355" y="796" width="79" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_048jl7y_di" bpmnElement="Flow_048jl7y">
        <di:waypoint x="500" y="670" />
        <di:waypoint x="590" y="670" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0njmbxs_di" bpmnElement="Flow_0njmbxs">
        <di:waypoint x="690" y="670" />
        <di:waypoint x="810" y="670" />
        <di:waypoint x="810" y="735" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10h6iwb_di" bpmnElement="Flow_10h6iwb">
        <di:waypoint x="580" y="850" />
        <di:waypoint x="810" y="850" />
        <di:waypoint x="810" y="785" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_16ix63f_di" bpmnElement="Flow_16ix63f">
        <di:waypoint x="835" y="760" />
        <di:waypoint x="930" y="760" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0or03pa_di" bpmnElement="Flow_0or03pa">
        <di:waypoint x="1030" y="760" />
        <di:waypoint x="1130" y="760" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0sfkoi7_di" bpmnElement="Flow_0sfkoi7">
        <di:waypoint x="1230" y="760" />
        <di:waypoint x="1332" y="760" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
