//Για αιτούντα
export const expectedNSFE = 3;
export const expectedNMF = -1;
export const expectedAGD = 3;
export const expectedCFC = 2;
export const expectedCLA = 1.29;
export const expectedNOA = 9;
export const expectedNSFA = 7;
export const expectedNSFG = 2;
export const expectedTNG = 1;
export const expectedTS = 0;
export const expectedNOAJS = 10;
export const expectedGM = 2;
export const expectedDENSITY = 0.08;
export const expectedCNC = 1.0;
export const expectedMGD = 3.0;
export const expectedGH = 0.0;
//Για ολόκληρο
export const expectedNMFWhole = 11;

export const xmlStrOfParticipant = `<bpmn:process id="Process_03dlkp9" isExecutable="true">
    <bpmn:sequenceFlow id="Flow_11dzkel" sourceRef="Activity_03nvs5r" targetRef="Activity_1n7hbld" />
    <bpmn:sequenceFlow id="Flow_0yp19vj" sourceRef="Activity_1cycp7x" targetRef="Activity_03nvs5r" />
    <bpmn:sequenceFlow id="Flow_1os26ur" sourceRef="Activity_1gh15v6" targetRef="Activity_1cycp7x" />
    <bpmn:sequenceFlow id="Flow_1xnauw9" sourceRef="StartEvent_1" targetRef="Activity_1gh15v6" />
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_1xnauw9</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_1r9yzsh" sourceRef="Activity_1n7hbld" targetRef="Activity_05ck4ex" />
    <bpmn:task id="Activity_05ck4ex" name="ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ ΣΤΟ ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_1r9yzsh</bpmn:incoming>
      <bpmn:outgoing>Flow_1xxwrie</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_037330l" sourceRef="Activity_1v13scl" targetRef="Event_0den01x" />
    <bpmn:endEvent id="Event_0den01x">
      <bpmn:incoming>Flow_037330l</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1xxwrie" sourceRef="Activity_05ck4ex" targetRef="Gateway_0406ohk" />
    <bpmn:sequenceFlow id="Flow_0v56xmy" sourceRef="Gateway_0406ohk" targetRef="Event_15vmx8f" />
    <bpmn:sequenceFlow id="Flow_0grjaxg" sourceRef="Gateway_0406ohk" targetRef="Event_0ig46sl" />
    <bpmn:sequenceFlow id="Flow_14yvepy" sourceRef="Event_15vmx8f" targetRef="Activity_11vvgin" />
    <bpmn:eventBasedGateway id="Gateway_0406ohk">
      <bpmn:incoming>Flow_1xxwrie</bpmn:incoming>
      <bpmn:outgoing>Flow_0v56xmy</bpmn:outgoing>
      <bpmn:outgoing>Flow_0grjaxg</bpmn:outgoing>
    </bpmn:eventBasedGateway>
    <bpmn:intermediateCatchEvent id="Event_15vmx8f" name="ΛΗΨΗ ΜΗΝΥΜΑΤΟΣ ΑΝΕΠΑΡΚΟΥΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_0v56xmy</bpmn:incoming>
      <bpmn:outgoing>Flow_14yvepy</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0r44mic" />
    </bpmn:intermediateCatchEvent>
    <bpmn:sequenceFlow id="Flow_09ovsju" sourceRef="Event_0ig46sl" targetRef="Activity_06458hr" />
    <bpmn:sequenceFlow id="Flow_1q7q004" sourceRef="Activity_11vvgin" targetRef="Activity_1v13scl" />
    <bpmn:task id="Activity_1v13scl" name="ΛΗΨΗ ΑΠΟΦΑΣΗΣ ΥΠΟΥΡΓΕΙΟΥ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_1q7q004</bpmn:incoming>
      <bpmn:incoming>Flow_18b0kxb</bpmn:incoming>
      <bpmn:outgoing>Flow_037330l</bpmn:outgoing>
    </bpmn:task>
    <bpmn:manualTask id="Activity_1gh15v6" name="ΣΥΝΤΑΞΗ ΠΕΡΙΓΡΑΦΗΣ ΝΕΟΥ ΠΡΟΪΌΝΤΟΣ ΚΑΠΝΟΥ">
      <bpmn:incoming>Flow_1xnauw9</bpmn:incoming>
      <bpmn:outgoing>Flow_1os26ur</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1cycp7x" name="ΣΥΝΤΑΞΗ  ΓΕΝΙΚΟΥ ΠΛΑΙΣΙΟΥ ΕΝΗΜΕΡΩΣΗΣ ΚΑΤΑΝΑΛΩΤΩΝ">
      <bpmn:incoming>Flow_1os26ur</bpmn:incoming>
      <bpmn:outgoing>Flow_0yp19vj</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_03nvs5r" name="ΣΥΝΤΑΞΗ ΕΠΙΣΤΗΜΟΝΙΚΗΣ ΑΞΙΟΛΟΓΗΣΗΣ ΠΡΟΪΌΝΤΟΣ">
      <bpmn:incoming>Flow_0yp19vj</bpmn:incoming>
      <bpmn:outgoing>Flow_11dzkel</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:serviceTask id="Activity_1n7hbld" name="ΠΑΡΟΧΗ ΑΠΟΔΕΙΞΗΣ ΑΠΑΙΤΟΥΜΕΝΟΥ ΠΑΡΑΒΟΛΟΥ">
      <bpmn:incoming>Flow_11dzkel</bpmn:incoming>
      <bpmn:outgoing>Flow_1r9yzsh</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:intermediateCatchEvent id="Event_0ig46sl" name="ΛΗΨΗ ΜΗΝΥΜΑΤΟΣ ΑΝΑΚΡΙΒΟΥΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_0grjaxg</bpmn:incoming>
      <bpmn:outgoing>Flow_09ovsju</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0m8i2fo" />
    </bpmn:intermediateCatchEvent>
    <bpmn:manualTask id="Activity_06458hr" name="ΕΠΑΝΑΣΥΝΤΑΞΗ ΑΚΡΙΒΕΣΤΕΡΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_09ovsju</bpmn:incoming>
      <bpmn:outgoing>Flow_1qh1saa</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:sequenceFlow id="Flow_1qh1saa" sourceRef="Activity_06458hr" targetRef="Activity_1v973cw" />
    <bpmn:sequenceFlow id="Flow_18b0kxb" sourceRef="Activity_1v973cw" targetRef="Activity_1v13scl" />
    <bpmn:manualTask id="Activity_1v973cw" name="ΕΠΑΝΥΠΟΒΟΛΗ ΑΚΡΙΒΕΣΤΕΡΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_1qh1saa</bpmn:incoming>
      <bpmn:outgoing>Flow_18b0kxb</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_11vvgin" name="ΕΠΑΝΥΠΟΒΟΛΗ ΟΛΟΚΛΗΡΩΜΕΝΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_14yvepy</bpmn:incoming>
      <bpmn:outgoing>Flow_1q7q004</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:association id="Association_0j65plb" sourceRef="StartEvent_1" targetRef="TextAnnotation_03b3rfz" />
    <bpmn:textAnnotation id="TextAnnotation_03b3rfz">
      <bpmn:text>Διενέργεια ελέγχου για την υποχρέωση δήλωσης ενεργειακής κατηγορίας κτιρίων σε εμπορικές διαφημίσεις και καταχωρίσεις</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:textAnnotation id="TextAnnotation_04w6f5c">
      <bpmn:text>ΜΕ ΤΑ ΕΓΓΡΑΦΑ ΠΟΥ ΕΧΟΥΝ ΣΥΝΤΑΧΘΕΙ ΣΤΕΛΝΕΙ ΜΙΑ ΟΛΟΚΛΗΡΩΜΕΝΗ ΑΙΤΗΣΗ</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Association_0zot27i" sourceRef="Activity_05ck4ex" targetRef="TextAnnotation_04w6f5c" />
  </bpmn:process>`;

export const xmlStr = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_0xwx4fh" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.3.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.17.0">
  <bpmn:collaboration id="Collaboration_0kacg80">
    <bpmn:participant id="Participant_1q9sg5k" name="ΑΙΤΟΥΝΤΑΣ" processRef="Process_03dlkp9" />
    <bpmn:participant id="Participant_035ewus" name="ΑΡΜΟΔΙΟ ΤΜΗΜΑ" processRef="Process_0ktvsny" />
    <bpmn:participant id="Participant_06drx61" name="ΕΠΙΤΡΟΠΗ ΑΞΙΟΛΟΓΗΣΗΣ" processRef="Process_0g566ig" />
    <bpmn:participant id="Participant_1uuqb6w" name="ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ" processRef="Process_1mjiv3x" />
    <bpmn:messageFlow id="Flow_0y7wnoh" sourceRef="Activity_10uqt8f" targetRef="Participant_06drx61" />
    <bpmn:messageFlow id="Flow_1w3uq4k" sourceRef="Activity_1bkwlv3" targetRef="Participant_1uuqb6w" />
    <bpmn:messageFlow id="Flow_0sy6f5v" name="ΕΝΤΟΣ 10 ΗΜΕΡΩΝ ΑΠΟ ΤΗΝ ΥΠΟΒΟΛΗ ΤΗΣ ΜΕ ΑΙΤΙΟΛΟΓΗΣΗ ΤΗΣ ΔΙΑΦΩΝΙΑΣ" sourceRef="Activity_0dkktn2" targetRef="Activity_1qqmr5e" />
    <bpmn:messageFlow id="Flow_1jq72f3" name="ΦΑΚΕΛΟΣ ΑΝΑΝΕΩΜΕΝΗΣ ΕΙΣΗΓΗΣΗΣ" sourceRef="Activity_01ju3ul" targetRef="Participant_1uuqb6w" />
    <bpmn:messageFlow id="Flow_0qlmccx" sourceRef="Activity_05ck4ex" targetRef="Participant_035ewus" />
    <bpmn:messageFlow id="Flow_0t5v2t3" sourceRef="Activity_061l8mr" targetRef="Activity_1h3q3vx" />
    <bpmn:messageFlow id="Flow_0fu0el0" sourceRef="Activity_1h3q3vx" targetRef="Activity_1v13scl" />
    <bpmn:messageFlow id="Flow_12coprp" sourceRef="Activity_11vvgin" targetRef="Activity_1c0j8wr" />
    <bpmn:messageFlow id="Flow_1q8eene" sourceRef="Event_12nt9hj" targetRef="Participant_1q9sg5k" />
    <bpmn:messageFlow id="Flow_031xgvn" sourceRef="Activity_1v973cw" targetRef="Activity_1c0j8wr" />
    <bpmn:messageFlow id="Flow_1qvnnch" sourceRef="Event_0dgzl3i" targetRef="Participant_1q9sg5k" />
    <bpmn:textAnnotation id="TextAnnotation_1d7ptwt">
      <bpmn:text>Επιτροπή Αξιολόγησης του βαθμού βλαπτικότητας των νέων προϊόντων καπνού</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Association_03ya1vn" sourceRef="Participant_06drx61" targetRef="TextAnnotation_1d7ptwt" />
  </bpmn:collaboration>
  <bpmn:process id="Process_03dlkp9" isExecutable="true">
    <bpmn:sequenceFlow id="Flow_11dzkel" sourceRef="Activity_03nvs5r" targetRef="Activity_1n7hbld" />
    <bpmn:sequenceFlow id="Flow_0yp19vj" sourceRef="Activity_1cycp7x" targetRef="Activity_03nvs5r" />
    <bpmn:sequenceFlow id="Flow_1os26ur" sourceRef="Activity_1gh15v6" targetRef="Activity_1cycp7x" />
    <bpmn:sequenceFlow id="Flow_1xnauw9" sourceRef="StartEvent_1" targetRef="Activity_1gh15v6" />
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_1xnauw9</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_1r9yzsh" sourceRef="Activity_1n7hbld" targetRef="Activity_05ck4ex" />
    <bpmn:task id="Activity_05ck4ex" name="ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ ΣΤΟ ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_1r9yzsh</bpmn:incoming>
      <bpmn:outgoing>Flow_1xxwrie</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_037330l" sourceRef="Activity_1v13scl" targetRef="Event_0den01x" />
    <bpmn:endEvent id="Event_0den01x">
      <bpmn:incoming>Flow_037330l</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1xxwrie" sourceRef="Activity_05ck4ex" targetRef="Gateway_0406ohk" />
    <bpmn:sequenceFlow id="Flow_0v56xmy" sourceRef="Gateway_0406ohk" targetRef="Event_15vmx8f" />
    <bpmn:sequenceFlow id="Flow_0grjaxg" sourceRef="Gateway_0406ohk" targetRef="Event_0ig46sl" />
    <bpmn:sequenceFlow id="Flow_14yvepy" sourceRef="Event_15vmx8f" targetRef="Activity_11vvgin" />
    <bpmn:eventBasedGateway id="Gateway_0406ohk">
      <bpmn:incoming>Flow_1xxwrie</bpmn:incoming>
      <bpmn:outgoing>Flow_0v56xmy</bpmn:outgoing>
      <bpmn:outgoing>Flow_0grjaxg</bpmn:outgoing>
    </bpmn:eventBasedGateway>
    <bpmn:intermediateCatchEvent id="Event_15vmx8f" name="ΛΗΨΗ ΜΗΝΥΜΑΤΟΣ ΑΝΕΠΑΡΚΟΥΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_0v56xmy</bpmn:incoming>
      <bpmn:outgoing>Flow_14yvepy</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0r44mic" />
    </bpmn:intermediateCatchEvent>
    <bpmn:sequenceFlow id="Flow_09ovsju" sourceRef="Event_0ig46sl" targetRef="Activity_06458hr" />
    <bpmn:sequenceFlow id="Flow_1q7q004" sourceRef="Activity_11vvgin" targetRef="Activity_1v13scl" />
    <bpmn:task id="Activity_1v13scl" name="ΛΗΨΗ ΑΠΟΦΑΣΗΣ ΥΠΟΥΡΓΕΙΟΥ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_1q7q004</bpmn:incoming>
      <bpmn:incoming>Flow_18b0kxb</bpmn:incoming>
      <bpmn:outgoing>Flow_037330l</bpmn:outgoing>
    </bpmn:task>
    <bpmn:manualTask id="Activity_1gh15v6" name="ΣΥΝΤΑΞΗ ΠΕΡΙΓΡΑΦΗΣ ΝΕΟΥ ΠΡΟΪΌΝΤΟΣ ΚΑΠΝΟΥ">
      <bpmn:incoming>Flow_1xnauw9</bpmn:incoming>
      <bpmn:outgoing>Flow_1os26ur</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1cycp7x" name="ΣΥΝΤΑΞΗ  ΓΕΝΙΚΟΥ ΠΛΑΙΣΙΟΥ ΕΝΗΜΕΡΩΣΗΣ ΚΑΤΑΝΑΛΩΤΩΝ">
      <bpmn:incoming>Flow_1os26ur</bpmn:incoming>
      <bpmn:outgoing>Flow_0yp19vj</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_03nvs5r" name="ΣΥΝΤΑΞΗ ΕΠΙΣΤΗΜΟΝΙΚΗΣ ΑΞΙΟΛΟΓΗΣΗΣ ΠΡΟΪΌΝΤΟΣ">
      <bpmn:incoming>Flow_0yp19vj</bpmn:incoming>
      <bpmn:outgoing>Flow_11dzkel</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:serviceTask id="Activity_1n7hbld" name="ΠΑΡΟΧΗ ΑΠΟΔΕΙΞΗΣ ΑΠΑΙΤΟΥΜΕΝΟΥ ΠΑΡΑΒΟΛΟΥ">
      <bpmn:incoming>Flow_11dzkel</bpmn:incoming>
      <bpmn:outgoing>Flow_1r9yzsh</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:intermediateCatchEvent id="Event_0ig46sl" name="ΛΗΨΗ ΜΗΝΥΜΑΤΟΣ ΑΝΑΚΡΙΒΟΥΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_0grjaxg</bpmn:incoming>
      <bpmn:outgoing>Flow_09ovsju</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0m8i2fo" />
    </bpmn:intermediateCatchEvent>
    <bpmn:manualTask id="Activity_06458hr" name="ΕΠΑΝΑΣΥΝΤΑΞΗ ΑΚΡΙΒΕΣΤΕΡΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_09ovsju</bpmn:incoming>
      <bpmn:outgoing>Flow_1qh1saa</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:sequenceFlow id="Flow_1qh1saa" sourceRef="Activity_06458hr" targetRef="Activity_1v973cw" />
    <bpmn:sequenceFlow id="Flow_18b0kxb" sourceRef="Activity_1v973cw" targetRef="Activity_1v13scl" />
    <bpmn:manualTask id="Activity_1v973cw" name="ΕΠΑΝΥΠΟΒΟΛΗ ΑΚΡΙΒΕΣΤΕΡΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_1qh1saa</bpmn:incoming>
      <bpmn:outgoing>Flow_18b0kxb</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_11vvgin" name="ΕΠΑΝΥΠΟΒΟΛΗ ΟΛΟΚΛΗΡΩΜΕΝΗΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_14yvepy</bpmn:incoming>
      <bpmn:outgoing>Flow_1q7q004</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:association id="Association_0j65plb" sourceRef="StartEvent_1" targetRef="TextAnnotation_03b3rfz" />
    <bpmn:textAnnotation id="TextAnnotation_03b3rfz">
      <bpmn:text>Διενέργεια ελέγχου για την υποχρέωση δήλωσης ενεργειακής κατηγορίας κτιρίων σε εμπορικές διαφημίσεις και καταχωρίσεις</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:textAnnotation id="TextAnnotation_04w6f5c">
      <bpmn:text>ΜΕ ΤΑ ΕΓΓΡΑΦΑ ΠΟΥ ΕΧΟΥΝ ΣΥΝΤΑΧΘΕΙ ΣΤΕΛΝΕΙ ΜΙΑ ΟΛΟΚΛΗΡΩΜΕΝΗ ΑΙΤΗΣΗ</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Association_0zot27i" sourceRef="Activity_05ck4ex" targetRef="TextAnnotation_04w6f5c" />
  </bpmn:process>
  <bpmn:process id="Process_0ktvsny" isExecutable="false">
    <bpmn:startEvent id="Event_1da2u5n" name="ΠΑΡΑΛΑΒΗ ΑΙΤΗΣΗΣ ΑΠΟ ΑΙΤΟΥΝΤΑ">
      <bpmn:outgoing>Flow_0seduc2</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1mblmid" />
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="Gateway_1uixq2i">
      <bpmn:incoming>Flow_00rds41</bpmn:incoming>
      <bpmn:outgoing>Flow_0bcl414</bpmn:outgoing>
      <bpmn:outgoing>Flow_0t1d4gr</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="Event_1xrrw7i" name="ΔΕΝ ΕΧΕΙ ΥΠΟΒΛΗΘΕΙ ΤΟ ΠΑΡΑΒΟΛΟ Ή ΕΙΝΑΙ ΑΚΥΡΟ">
      <bpmn:incoming>Flow_0t1d4gr</bpmn:incoming>
      <bpmn:terminateEventDefinition id="TerminateEventDefinition_1untntm" />
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0seduc2" sourceRef="Event_1da2u5n" targetRef="Activity_1n8fk2g" />
    <bpmn:sequenceFlow id="Flow_00rds41" sourceRef="Activity_1n8fk2g" targetRef="Gateway_1uixq2i" />
    <bpmn:sequenceFlow id="Flow_0bcl414" name="ΤΟ ΠΑΡΑΒΟΛΟ ΕΧΕΙ ΚΑΤΑΒΛΗΘΕΙ" sourceRef="Gateway_1uixq2i" targetRef="Activity_10uqt8f" />
    <bpmn:sequenceFlow id="Flow_0t1d4gr" sourceRef="Gateway_1uixq2i" targetRef="Event_1xrrw7i" />
    <bpmn:sequenceFlow id="Flow_1rw1oyl" sourceRef="Activity_10uqt8f" targetRef="Activity_1h3q3vx" />
    <bpmn:sequenceFlow id="Flow_10hen6h" sourceRef="Activity_1h3q3vx" targetRef="Event_1tcgg3l" />
    <bpmn:endEvent id="Event_1tcgg3l">
      <bpmn:incoming>Flow_10hen6h</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:task id="Activity_1h3q3vx" name="ΚΟΙΝΟΠΟΙΗΣΗ ΑΠΟΦΑΣΗΣ ΥΠ. ΥΓΕΙΑΣ ΣΤΟΝ ΑΙΤΟΥΝΤΑ">
      <bpmn:incoming>Flow_1rw1oyl</bpmn:incoming>
      <bpmn:outgoing>Flow_10hen6h</bpmn:outgoing>
    </bpmn:task>
    <bpmn:manualTask id="Activity_10uqt8f" name="ΔΙΑΒΙΒΑΣΗ ΑΙΤΗΣΗΣ ΠΡΟΣ ΕΠΙΤΡΟΠΗ ΑΞΙΟΛΟΓΗΣΗΣ">
      <bpmn:incoming>Flow_0bcl414</bpmn:incoming>
      <bpmn:outgoing>Flow_1rw1oyl</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1n8fk2g" name="ΕΛΕΓΧΟΣ ΕΓΚΥΡΟΤΗΤΑΣ ΠΑΡΑΒΟΛΟΥ">
      <bpmn:incoming>Flow_0seduc2</bpmn:incoming>
      <bpmn:outgoing>Flow_00rds41</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:boundaryEvent id="Event_13oo1wj" attachedToRef="Activity_10uqt8f">
      <bpmn:outgoing>Flow_1eykri0</bpmn:outgoing>
    </bpmn:boundaryEvent>
    <bpmn:sequenceFlow id="Flow_1eykri0" sourceRef="Event_13oo1wj" targetRef="Activity_1tzzvd8" />
    <bpmn:task id="Activity_1tzzvd8">
      <bpmn:incoming>Flow_1eykri0</bpmn:incoming>
      <bpmn:outgoing>Flow_0chgv9j</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Event_1r53zf2">
      <bpmn:incoming>Flow_0chgv9j</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0chgv9j" sourceRef="Activity_1tzzvd8" targetRef="Event_1r53zf2" />
  </bpmn:process>
  <bpmn:process id="Process_0g566ig" isExecutable="false">
    <bpmn:eventBasedGateway id="Gateway_1ef6kap">
      <bpmn:incoming>Flow_1u0921z</bpmn:incoming>
      <bpmn:outgoing>Flow_10bfinw</bpmn:outgoing>
      <bpmn:outgoing>Flow_1witpbh</bpmn:outgoing>
    </bpmn:eventBasedGateway>
    <bpmn:intermediateCatchEvent id="Event_0xca1ju" name="ΛΗΨΗ ΘΕΤΙΚΗΣ ΑΠΑΝΤΗΣΗΣ ΑΠΟ ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_10bfinw</bpmn:incoming>
      <bpmn:outgoing>Flow_04mc4vk</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1oryy1m" />
    </bpmn:intermediateCatchEvent>
    <bpmn:endEvent id="Event_0gazsq7">
      <bpmn:incoming>Flow_0rvm7pu</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1qm3pu7" sourceRef="Event_0mnryf1" targetRef="Activity_1y6fnir" />
    <bpmn:sequenceFlow id="Flow_1q7qzjx" sourceRef="Activity_1y6fnir" targetRef="Gateway_0yv4qj7" />
    <bpmn:sequenceFlow id="Flow_15huxku" sourceRef="Activity_1c0j8wr" targetRef="Gateway_1vvsqw0" />
    <bpmn:sequenceFlow id="Flow_0ryy5k2" name="Ο ΦΑΚΕΛΟΣ ΕΙΝΑΙ ΑΝΕΠΑΡΚΗΣ &#39;Η ΑΝΑΚΡΙΒΉΣ" sourceRef="Gateway_1vvsqw0" targetRef="Event_12nt9hj" />
    <bpmn:sequenceFlow id="Flow_0724yxs" sourceRef="Gateway_1vvsqw0" targetRef="Activity_1q7yjs7" />
    <bpmn:sequenceFlow id="Flow_1t3mqtr" sourceRef="Activity_1q7yjs7" targetRef="Activity_1bkwlv3" />
    <bpmn:sequenceFlow id="Flow_1u0921z" sourceRef="Activity_1bkwlv3" targetRef="Gateway_1ef6kap" />
    <bpmn:sequenceFlow id="Flow_0k3g1k3" sourceRef="Activity_1qqmr5e" targetRef="Activity_01ju3ul" />
    <bpmn:sequenceFlow id="Flow_0jvzw93" sourceRef="Activity_01ju3ul" targetRef="Activity_061l8mr" />
    <bpmn:sequenceFlow id="Flow_04mc4vk" sourceRef="Event_0xca1ju" targetRef="Activity_061l8mr" />
    <bpmn:sequenceFlow id="Flow_0rvm7pu" sourceRef="Activity_061l8mr" targetRef="Event_0gazsq7" />
    <bpmn:sequenceFlow id="Flow_10bfinw" sourceRef="Gateway_1ef6kap" targetRef="Event_0xca1ju" />
    <bpmn:sequenceFlow id="Flow_1witpbh" name="ΛΗΨΗ ΑΡΝΗΤΙΚΗΣ ΑΠΑΝΤΗΣΗΣ ΑΠΟ ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ" sourceRef="Gateway_1ef6kap" targetRef="Event_08td7b2" />
    <bpmn:sequenceFlow id="Flow_1dva3wq" sourceRef="Event_08td7b2" targetRef="Activity_1qqmr5e" />
    <bpmn:sequenceFlow id="Flow_00i4d0r" sourceRef="Gateway_0yv4qj7" targetRef="Activity_1c0j8wr" />
    <bpmn:sequenceFlow id="Flow_19l5qpy" name="Η ΑΙΤΗΣΗ ΔΕΝ ΕΙΝΑΙ ΠΛΗΡΗΣ" sourceRef="Gateway_0yv4qj7" targetRef="Event_0dgzl3i" />
    <bpmn:startEvent id="Event_0mnryf1" name="ΛΗΨΗ ΑΙΤΗΣΗΣ ΑΠΟ ΑΡΜΟΔΙΟ ΤΜΗΜΑ">
      <bpmn:outgoing>Flow_1qm3pu7</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1fl2cpb" />
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="Gateway_0yv4qj7">
      <bpmn:incoming>Flow_1q7qzjx</bpmn:incoming>
      <bpmn:outgoing>Flow_19l5qpy</bpmn:outgoing>
      <bpmn:outgoing>Flow_00i4d0r</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:exclusiveGateway id="Gateway_1vvsqw0" name="Ο ΦΑΚΕΛΟΣ ΕΙΝΑΙ ΠΛΗΡΗΣ ΚΑΙ ΑΚΡΙΒΗΣ">
      <bpmn:incoming>Flow_15huxku</bpmn:incoming>
      <bpmn:outgoing>Flow_0ryy5k2</bpmn:outgoing>
      <bpmn:outgoing>Flow_0724yxs</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="Event_12nt9hj">
      <bpmn:incoming>Flow_0ryy5k2</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0juukcs" />
    </bpmn:endEvent>
    <bpmn:intermediateCatchEvent id="Event_08td7b2">
      <bpmn:incoming>Flow_1witpbh</bpmn:incoming>
      <bpmn:outgoing>Flow_1dva3wq</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1uk00i8" />
    </bpmn:intermediateCatchEvent>
    <bpmn:manualTask id="Activity_1y6fnir" name="ΑΞΙΟΛΟΓΗΣΗ ΠΛΗΡΟΤΗΤΗΑΣ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_1qm3pu7</bpmn:incoming>
      <bpmn:outgoing>Flow_1q7qzjx</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1c0j8wr" name="ΑΞΙΟΛΟΓΗΣΗ ΣΤΟΙΧΕΙΩΝ ΑΙΤΗΣΗΣ">
      <bpmn:incoming>Flow_00i4d0r</bpmn:incoming>
      <bpmn:outgoing>Flow_15huxku</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1q7yjs7" name="ΣΥΝΤΑΞΗ ΕΙΣΗΓΗΣΗΣ">
      <bpmn:incoming>Flow_0724yxs</bpmn:incoming>
      <bpmn:outgoing>Flow_1t3mqtr</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1bkwlv3" name="ΥΠΟΒΟΛΗ ΕΙΣΗΓΗΣΗΣ ΠΡΟΣ ΥΠΟΥΡΓΕΙΟ ΥΓΕΙΑΣ">
      <bpmn:incoming>Flow_1t3mqtr</bpmn:incoming>
      <bpmn:outgoing>Flow_1u0921z</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_1qqmr5e" name="ΕΠΑΝΑΣΥΝΤΑΞΗ ΕΙΣΗΓΗΣΗΣ">
      <bpmn:incoming>Flow_1dva3wq</bpmn:incoming>
      <bpmn:outgoing>Flow_0k3g1k3</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_01ju3ul" name="ΥΠΟΒΟΛΗ ΝΕΩΤΕΡΗΣ ΚΡΙΣΗΣ">
      <bpmn:incoming>Flow_0k3g1k3</bpmn:incoming>
      <bpmn:outgoing>Flow_0jvzw93</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_061l8mr" name="ΕΚΔΟΣΗ ΑΠΟΦΑΣΗΣ">
      <bpmn:incoming>Flow_0jvzw93</bpmn:incoming>
      <bpmn:incoming>Flow_04mc4vk</bpmn:incoming>
      <bpmn:outgoing>Flow_0rvm7pu</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:endEvent id="Event_0dgzl3i">
      <bpmn:incoming>Flow_19l5qpy</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0i9j9xu" />
    </bpmn:endEvent>
    <bpmn:textAnnotation id="TextAnnotation_07v6lfr">
      <bpmn:text>ΕΝΤΟΣ 6 ΜΗΝΩΝ ΑΠΟ ΤΗΝ ΤΕΛΕΥΤΑΙΑ ΤΡΟΠΟΠΟΙΗΣΗΣ ΣΤΟΙΧΕΙΩΝ ΑΠΟ ΤΟΝ ΑΙΤΟΥΝΤΑ</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:textAnnotation id="TextAnnotation_16pje6c">
      <bpmn:text>Η ΑΙΤΗΣΗ ΠΕΡΙΕΧΕΙ ΟΛΑ ΤΑ ΑΠΑΡΑΙΤΗΤΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Association_1r0xcz9" sourceRef="Flow_00i4d0r" targetRef="TextAnnotation_16pje6c" />
    <bpmn:association id="Association_0cxtszj" sourceRef="Activity_1bkwlv3" targetRef="TextAnnotation_07v6lfr" />
    <bpmn:textAnnotation id="TextAnnotation_18sgbjg" />
  </bpmn:process>
  <bpmn:process id="Process_1mjiv3x" isExecutable="false">
    <bpmn:startEvent id="Event_0adjsr2" name="ΛΗΨΗ ΕΙΣΗΓΗΣΗΣ ΑΠΟ ΕΠΙΤΡΟΠΗ ΑΞΙΟΛΟΓΗΣΗΣ">
      <bpmn:outgoing>Flow_0rq8f1l</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1tt5ll9" />
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="Gateway_14p8w7g">
      <bpmn:incoming>Flow_0ak6rdo</bpmn:incoming>
      <bpmn:outgoing>Flow_1ovbhgt</bpmn:outgoing>
      <bpmn:outgoing>Flow_0mc2dna</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:intermediateThrowEvent id="Event_1whrtcx" name="ΚΟΙΝΟΠΟΙΗΣΗ ΣΥΜΦΩΝΙΑΣ ΜΕ ΤΟ ΠΕΡΙΕΧΟΜΕΝΟ ΤΗΣ ΕΙΣΗΓΗΣΗΣ">
      <bpmn:incoming>Flow_0mc2dna</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0lwq3ya" />
    </bpmn:intermediateThrowEvent>
    <bpmn:endEvent id="Event_0me5qsq" name="Η ΝΕΩΤΕΡΗ ΚΡΙΣΗ ΤΗΣ ΕΠΙΤΡΟΠΗΣ ΕΙΝΑΙ ΔΕΣΜΕΥΤΙΚΗ">
      <bpmn:incoming>Flow_0h5nsaj</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0rq8f1l" sourceRef="Event_0adjsr2" targetRef="Activity_1d1ws71" />
    <bpmn:sequenceFlow id="Flow_0ak6rdo" sourceRef="Activity_1d1ws71" targetRef="Gateway_14p8w7g" />
    <bpmn:sequenceFlow id="Flow_1ovbhgt" name="ΔΙΑΦΩΝΙΑ ΜΕ ΤΟ ΠΕΡΙΕΧΟΜΕΝΟ ΤΗΣ ΕΙΣΗΓΗΣΗΣ" sourceRef="Gateway_14p8w7g" targetRef="Activity_0dkktn2" />
    <bpmn:sequenceFlow id="Flow_0h5nsaj" sourceRef="Activity_0dkktn2" targetRef="Event_0me5qsq" />
    <bpmn:sequenceFlow id="Flow_0mc2dna" sourceRef="Gateway_14p8w7g" targetRef="Event_1whrtcx" />
    <bpmn:manualTask id="Activity_1d1ws71" name="ΕΞΕΤΑΣΗ ΕΙΣΗΓΗΣΗΣ">
      <bpmn:incoming>Flow_0rq8f1l</bpmn:incoming>
      <bpmn:outgoing>Flow_0ak6rdo</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:manualTask id="Activity_0dkktn2" name="ΑΝΑΠΟΜΠΗ ΕΙΣΗΓΗΣΗΣ ΠΡΟΣ ΕΠΙΤΡΟΠΗ">
      <bpmn:incoming>Flow_1ovbhgt</bpmn:incoming>
      <bpmn:outgoing>Flow_0h5nsaj</bpmn:outgoing>
    </bpmn:manualTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0kacg80">
      <bpmndi:BPMNShape id="Participant_1q9sg5k_di" bpmnElement="Participant_1q9sg5k" isHorizontal="true">
        <dc:Bounds x="129" y="80" width="2681" height="410" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="172" y="232" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_05ck4ex_di" bpmnElement="Activity_05ck4ex">
        <dc:Bounds x="830" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0den01x_di" bpmnElement="Event_0den01x">
        <dc:Bounds x="2712" y="232" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0zhnjp2_di" bpmnElement="Gateway_0406ohk">
        <dc:Bounds x="990" y="225" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_15vmx8f_di" bpmnElement="Event_15vmx8f">
        <dc:Bounds x="997" y="352" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="978" y="395" width="75" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1v13scl_di" bpmnElement="Activity_1v13scl">
        <dc:Bounds x="2150" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0px1yoa_di" bpmnElement="Activity_1gh15v6">
        <dc:Bounds x="260" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1uxt0rp_di" bpmnElement="Activity_1cycp7x">
        <dc:Bounds x="420" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1jj2s51_di" bpmnElement="Activity_03nvs5r">
        <dc:Bounds x="550" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_083z238_di" bpmnElement="Activity_1n7hbld">
        <dc:Bounds x="680" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0ig46sl_di" bpmnElement="Event_0ig46sl">
        <dc:Bounds x="1192" y="232" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1175" y="275" width="71" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1f8a240_di" bpmnElement="Activity_06458hr">
        <dc:Bounds x="1290" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1we3bll_di" bpmnElement="Activity_1v973cw">
        <dc:Bounds x="1460" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1xqjg19_di" bpmnElement="Activity_11vvgin">
        <dc:Bounds x="1089" y="330" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_03b3rfz_di" bpmnElement="TextAnnotation_03b3rfz">
        <dc:Bounds x="220" y="102" width="250" height="50" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1mwbppn" bpmnElement="TextAnnotation_04w6f5c">
        <dc:Bounds x="950" y="110" width="129.9960815047022" height="97.98197611745995" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_11dzkel_di" bpmnElement="Flow_11dzkel">
        <di:waypoint x="650" y="250" />
        <di:waypoint x="680" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0yp19vj_di" bpmnElement="Flow_0yp19vj">
        <di:waypoint x="520" y="250" />
        <di:waypoint x="550" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1os26ur_di" bpmnElement="Flow_1os26ur">
        <di:waypoint x="360" y="250" />
        <di:waypoint x="420" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xnauw9_di" bpmnElement="Flow_1xnauw9">
        <di:waypoint x="208" y="250" />
        <di:waypoint x="260" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1r9yzsh_di" bpmnElement="Flow_1r9yzsh">
        <di:waypoint x="780" y="250" />
        <di:waypoint x="830" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_037330l_di" bpmnElement="Flow_037330l">
        <di:waypoint x="2250" y="250" />
        <di:waypoint x="2712" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xxwrie_di" bpmnElement="Flow_1xxwrie">
        <di:waypoint x="930" y="250" />
        <di:waypoint x="990" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0v56xmy_di" bpmnElement="Flow_0v56xmy">
        <di:waypoint x="1015" y="275" />
        <di:waypoint x="1015" y="352" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0grjaxg_di" bpmnElement="Flow_0grjaxg">
        <di:waypoint x="1040" y="250" />
        <di:waypoint x="1192" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_14yvepy_di" bpmnElement="Flow_14yvepy">
        <di:waypoint x="1033" y="370" />
        <di:waypoint x="1089" y="370" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_09ovsju_di" bpmnElement="Flow_09ovsju">
        <di:waypoint x="1228" y="250" />
        <di:waypoint x="1290" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1q7q004_di" bpmnElement="Flow_1q7q004">
        <di:waypoint x="1189" y="370" />
        <di:waypoint x="2160" y="370" />
        <di:waypoint x="2160" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qh1saa_di" bpmnElement="Flow_1qh1saa">
        <di:waypoint x="1390" y="250" />
        <di:waypoint x="1460" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_18b0kxb_di" bpmnElement="Flow_18b0kxb">
        <di:waypoint x="1560" y="250" />
        <di:waypoint x="2150" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_0j65plb_di" bpmnElement="Association_0j65plb">
        <di:waypoint x="199" y="235" />
        <di:waypoint x="249" y="152" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_0zot27i_di" bpmnElement="Association_0zot27i">
        <di:waypoint x="929" y="216" />
        <di:waypoint x="950" y="202" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Participant_035ewus_di" bpmnElement="Participant_035ewus" isHorizontal="true">
        <dc:Bounds x="390" y="520" width="2130" height="860" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1a9388q_di" bpmnElement="Event_1da2u5n">
        <dc:Bounds x="442" y="632" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="424" y="700" width="73" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1uixq2i_di" bpmnElement="Gateway_1uixq2i" isMarkerVisible="true">
        <dc:Bounds x="655" y="625" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0zsgadn_di" bpmnElement="Event_1xrrw7i">
        <dc:Bounds x="662" y="712" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="568" y="713" width="83" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1tcgg3l_di" bpmnElement="Event_1tcgg3l">
        <dc:Bounds x="2402" y="632" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1h3q3vx_di" bpmnElement="Activity_1h3q3vx">
        <dc:Bounds x="2150" y="610" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ezv5wy_di" bpmnElement="Activity_10uqt8f">
        <dc:Bounds x="740" y="610" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1nw87hj_di" bpmnElement="Activity_1n8fk2g">
        <dc:Bounds x="530" y="610" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1tzzvd8_di" bpmnElement="Activity_1tzzvd8">
        <dc:Bounds x="870" y="690" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1r53zf2_di" bpmnElement="Event_1r53zf2">
        <dc:Bounds x="1002" y="712" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0n4kom2_di" bpmnElement="Event_13oo1wj">
        <dc:Bounds x="802" y="672" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0seduc2_di" bpmnElement="Flow_0seduc2">
        <di:waypoint x="478" y="650" />
        <di:waypoint x="530" y="650" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00rds41_di" bpmnElement="Flow_00rds41">
        <di:waypoint x="630" y="650" />
        <di:waypoint x="655" y="650" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0bcl414_di" bpmnElement="Flow_0bcl414">
        <di:waypoint x="705" y="650" />
        <di:waypoint x="740" y="650" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="670" y="563" width="79" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t1d4gr_di" bpmnElement="Flow_0t1d4gr">
        <di:waypoint x="680" y="675" />
        <di:waypoint x="680" y="712" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1rw1oyl_di" bpmnElement="Flow_1rw1oyl">
        <di:waypoint x="840" y="650" />
        <di:waypoint x="2150" y="650" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10hen6h_di" bpmnElement="Flow_10hen6h">
        <di:waypoint x="2250" y="650" />
        <di:waypoint x="2402" y="650" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1eykri0_di" bpmnElement="Flow_1eykri0">
        <di:waypoint x="820" y="708" />
        <di:waypoint x="820" y="730" />
        <di:waypoint x="870" y="730" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0chgv9j_di" bpmnElement="Flow_0chgv9j">
        <di:waypoint x="970" y="730" />
        <di:waypoint x="1002" y="730" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Participant_06drx61_di" bpmnElement="Participant_06drx61" isHorizontal="true">
        <dc:Bounds x="630" y="810" width="1770" height="400" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_18sgbjg_di" bpmnElement="TextAnnotation_18sgbjg">
        <dc:Bounds x="830" y="870" width="100" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_18sm6hd_di" bpmnElement="Gateway_1ef6kap">
        <dc:Bounds x="1635" y="1035" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0xca1ju_di" bpmnElement="Event_0xca1ju">
        <dc:Bounds x="1642" y="952" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1615" y="893" width="90" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0gazsq7_di" bpmnElement="Event_0gazsq7">
        <dc:Bounds x="2342" y="1042" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1xnl1zy_di" bpmnElement="Event_0dgzl3i">
        <dc:Bounds x="1002" y="902" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0gnt7wu_di" bpmnElement="Event_0mnryf1">
        <dc:Bounds x="712" y="1042" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="709" y="980" width="82" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0yv4qj7_di" bpmnElement="Gateway_0yv4qj7" isMarkerVisible="true">
        <dc:Bounds x="995" y="1035" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1vvsqw0_di" bpmnElement="Gateway_1vvsqw0" isMarkerVisible="true">
        <dc:Bounds x="1235" y="1035" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1271" y="1110" width="78" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0z2uysu_di" bpmnElement="Event_12nt9hj">
        <dc:Bounds x="1242" y="902" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_08td7b2_di" bpmnElement="Event_08td7b2">
        <dc:Bounds x="1752" y="1042" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0c2s8w6_di" bpmnElement="Activity_1y6fnir">
        <dc:Bounds x="820" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_018vu0f_di" bpmnElement="Activity_1c0j8wr">
        <dc:Bounds x="1089" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0qz8ouo_di" bpmnElement="Activity_1q7yjs7">
        <dc:Bounds x="1310" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ct70jj_di" bpmnElement="Activity_1bkwlv3">
        <dc:Bounds x="1470" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1hmkeh9_di" bpmnElement="Activity_1qqmr5e">
        <dc:Bounds x="1850" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_16w4y7x_di" bpmnElement="Activity_01ju3ul">
        <dc:Bounds x="2000" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_17szo5z_di" bpmnElement="Activity_061l8mr">
        <dc:Bounds x="2160" y="1020" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_07v6lfr_di" bpmnElement="TextAnnotation_07v6lfr">
        <dc:Bounds x="1470" y="900" width="139.98824451410658" height="84.63949843260188" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_16pje6c_di" bpmnElement="TextAnnotation_16pje6c">
        <dc:Bounds x="990" y="1120" width="137" height="60" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1qm3pu7_di" bpmnElement="Flow_1qm3pu7">
        <di:waypoint x="748" y="1060" />
        <di:waypoint x="820" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1q7qzjx_di" bpmnElement="Flow_1q7qzjx">
        <di:waypoint x="920" y="1060" />
        <di:waypoint x="995" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_15huxku_di" bpmnElement="Flow_15huxku">
        <di:waypoint x="1189" y="1060" />
        <di:waypoint x="1235" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ryy5k2_di" bpmnElement="Flow_0ryy5k2">
        <di:waypoint x="1260" y="1035" />
        <di:waypoint x="1260" y="938" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1280" y="905" width="80" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0724yxs_di" bpmnElement="Flow_0724yxs">
        <di:waypoint x="1285" y="1060" />
        <di:waypoint x="1310" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1t3mqtr_di" bpmnElement="Flow_1t3mqtr">
        <di:waypoint x="1410" y="1060" />
        <di:waypoint x="1470" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1u0921z_di" bpmnElement="Flow_1u0921z">
        <di:waypoint x="1570" y="1060" />
        <di:waypoint x="1635" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0k3g1k3_di" bpmnElement="Flow_0k3g1k3">
        <di:waypoint x="1950" y="1060" />
        <di:waypoint x="2000" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jvzw93_di" bpmnElement="Flow_0jvzw93">
        <di:waypoint x="2100" y="1060" />
        <di:waypoint x="2160" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04mc4vk_di" bpmnElement="Flow_04mc4vk">
        <di:waypoint x="1678" y="970" />
        <di:waypoint x="2170" y="970" />
        <di:waypoint x="2170" y="1020" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0rvm7pu_di" bpmnElement="Flow_0rvm7pu">
        <di:waypoint x="2260" y="1060" />
        <di:waypoint x="2342" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10bfinw_di" bpmnElement="Flow_10bfinw">
        <di:waypoint x="1660" y="1035" />
        <di:waypoint x="1660" y="988" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1witpbh_di" bpmnElement="Flow_1witpbh">
        <di:waypoint x="1685" y="1060" />
        <di:waypoint x="1752" y="1060" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1715" y="1097" width="90" height="66" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dva3wq_di" bpmnElement="Flow_1dva3wq">
        <di:waypoint x="1788" y="1060" />
        <di:waypoint x="1850" y="1060" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00i4d0r_di" bpmnElement="Flow_00i4d0r">
        <di:waypoint x="1045" y="1060" />
        <di:waypoint x="1089" y="1060" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1323" y="767" width="84" height="66" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19l5qpy_di" bpmnElement="Flow_19l5qpy">
        <di:waypoint x="1020" y="1035" />
        <di:waypoint x="1020" y="938" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="921" y="976" width="78" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1r0xcz9_di" bpmnElement="Association_1r0xcz9">
        <di:waypoint x="1067" y="1060" />
        <di:waypoint x="1027" y="1120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_0cxtszj_di" bpmnElement="Association_0cxtszj">
        <di:waypoint x="1520" y="1020" />
        <di:waypoint x="1520" y="985" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Participant_1uuqb6w_di" bpmnElement="Participant_1uuqb6w" isHorizontal="true">
        <dc:Bounds x="1450" y="1360" width="820" height="310" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1eepd4l_di" bpmnElement="Event_0adjsr2">
        <dc:Bounds x="1512" y="1512" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1486" y="1555" width="88" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_14p8w7g_di" bpmnElement="Gateway_14p8w7g" isMarkerVisible="true">
        <dc:Bounds x="1810" y="1505" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1xts8pu_di" bpmnElement="Event_1whrtcx">
        <dc:Bounds x="1817" y="1402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1702" y="1387" width="86" height="66" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0me5qsq_di" bpmnElement="Event_0me5qsq">
        <dc:Bounds x="2082" y="1512" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2095" y="1552" width="70" height="66" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0on2iuz_di" bpmnElement="Activity_1d1ws71">
        <dc:Bounds x="1600" y="1490" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_18zzg0e_di" bpmnElement="Activity_0dkktn2">
        <dc:Bounds x="1890" y="1490" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0rq8f1l_di" bpmnElement="Flow_0rq8f1l">
        <di:waypoint x="1548" y="1530" />
        <di:waypoint x="1600" y="1530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ak6rdo_di" bpmnElement="Flow_0ak6rdo">
        <di:waypoint x="1700" y="1530" />
        <di:waypoint x="1810" y="1530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ovbhgt_di" bpmnElement="Flow_1ovbhgt">
        <di:waypoint x="1860" y="1530" />
        <di:waypoint x="1890" y="1530" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1777" y="1573" width="86" height="53" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0h5nsaj_di" bpmnElement="Flow_0h5nsaj">
        <di:waypoint x="1990" y="1530" />
        <di:waypoint x="2082" y="1530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0mc2dna_di" bpmnElement="Flow_0mc2dna">
        <di:waypoint x="1835" y="1505" />
        <di:waypoint x="1835" y="1438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="TextAnnotation_1d7ptwt_di" bpmnElement="TextAnnotation_1d7ptwt">
        <dc:Bounds x="230" y="940" width="170" height="50" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_03ya1vn_di" bpmnElement="Association_03ya1vn">
        <di:waypoint x="630" y="1000" />
        <di:waypoint x="400" y="971" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0y7wnoh_di" bpmnElement="Flow_0y7wnoh">
        <di:waypoint x="790" y="690" />
        <di:waypoint x="790" y="810" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1w3uq4k_di" bpmnElement="Flow_1w3uq4k">
        <di:waypoint x="1520" y="1100" />
        <di:waypoint x="1520" y="1360" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0sy6f5v_di" bpmnElement="Flow_0sy6f5v">
        <di:waypoint x="1940" y="1490" />
        <di:waypoint x="1940" y="1100" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1838" y="1246" width="84" height="80" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1jq72f3_di" bpmnElement="Flow_1jq72f3">
        <di:waypoint x="2050" y="1100" />
        <di:waypoint x="2050" y="1360" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2068" y="1278" width="85" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0qlmccx_di" bpmnElement="Flow_0qlmccx">
        <di:waypoint x="880" y="290" />
        <di:waypoint x="880" y="520" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t5v2t3_di" bpmnElement="Flow_0t5v2t3">
        <di:waypoint x="2210" y="1020" />
        <di:waypoint x="2210" y="690" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0fu0el0_di" bpmnElement="Flow_0fu0el0">
        <di:waypoint x="2200" y="610" />
        <di:waypoint x="2200" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qvnnch_di" bpmnElement="Flow_1qvnnch">
        <di:waypoint x="1020" y="902" />
        <di:waypoint x="1020" y="490" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12coprp_di" bpmnElement="Flow_12coprp">
        <di:waypoint x="1110" y="410" />
        <di:waypoint x="1110" y="1020" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1q8eene_di" bpmnElement="Flow_1q8eene">
        <di:waypoint x="1260" y="902" />
        <di:waypoint x="1260" y="490" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_031xgvn_di" bpmnElement="Flow_031xgvn">
        <di:waypoint x="1510" y="290" />
        <di:waypoint x="1510" y="740" />
        <di:waypoint x="1160" y="740" />
        <di:waypoint x="1160" y="1020" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
