<!DOCTYPE html>
<html>
<head>
	<link href="dist/css/bootstrap.min.css" rel="stylesheet">
	<script type="text/javascript">
			function updateTextInput(val) 
			{
				document.getElementById('slideval').value=val; 
			}
			function updateTextInput2(val) 
			{
				document.getElementById('slideval2').value=val; 
			}
	</script>
</head>
<body>
  
<form action="IOPEKnee.php" method="POST">
 
<div class="container">
	<div class="panel panel-primary">
		<div class="panel-heading text-center">
			SPINE EVALUATION FORM
		</div>
		<table class="table table-bordered">					
			<tr>
				<td width="15%">Dominant Hand:</td>
				<td colspan="2">
					R <input type="radio" id="DominantHandRight" name="Dominant" value="R" checked>
					L <input type="radio" id="DominantHandLeft"  name="Dominant" value="L">
				</td>
			</tr>
			<tr>
				<td>Chief Complaint:</td>
				<td colspan="2">
					Low Back/Legs <input type="radio" id="ChiefComplainSpine" name="CC" value="Low Back/Legs" checked>
					Neck/Arms <input type="radio" id="ChiefComplainSpine2"  name="CC" value="Neck/Arms">
					Thoracic/Upper Back <input type="radio" id="ChiefComplainSpine3"  name="CC" value="Thoracic/Upper Back">
				</td>
			</tr>
			<tr>
				<td colspan="5" class="success"><b>Onset of spine problem:</b></td>
			</tr>
			<tr>
				<td>When did your current problem/symptoms begin?</td>
				<td colspan="2"><textarea class="form-control" id="SymptomsStarted" placeholder="When did the Symptoms begin?"></textarea></td>
			</tr>
			<tr>
				<td>Have your symptoms changed since onset?</td>
				<td colspan="2"><textarea class="form-control" id="SymptomsChange" placeholder="Have your symoptoms change since onset?"></textarea></td>
			</tr>
			<tr>
				<td>Have you had prior episodes of this condition?</td>
				<td colspan="2"><textarea class="form-control" id="SymptomsChange" placeholder="Have your symoptoms change since onset?"></textarea></td>
			</tr>
			<tr>
				<td colspan="3">Is your problem the result of an on-the-job injuty?
					Yes <input type="radio" id="JobInjuryYes" name="JI" value="Y" checked>
					No <input type="radio" id="JobInjuryNo"  name="JI" value="N">
				</td>
			</tr>
			<tr>
				<td>Estimated Date of Injury</td>
				<td>
					<input type="Date" id="injurydate" class="form-control" style="width:160px;">
				</td>
			</tr>
			<tr>
				<td class="success" colspan="3"><b>Pain Sevirity</b></td>
			</tr>
			<tr>
				<td colspan="3">If 10 is the worst pain imaginable and 0 is no pain at all, please note your pain over the last <b>TWO WEEKS</b></td>
			</tr>
			<tr>
				<Td class="text-center">A</td>
				<td>
					<div class="form-inline">
						Please rate your <B>AVERAGE</B> amount of back/neck pain:
						<input type="range" min="0" max="10" value="0" step="1"  onchange="updateTextInput(this.value);"style="width:50%;">
						<input type="text" class="form-control" id="slideval" value="" style="width:50px;">
					</div>
				</td>
			</tr>
			<tr>
				<Td class="text-center">B</td>
				<td>
					Please rate your <B>AVERAGE</B> amount of leg/arm pain:
					<input type="range" min="0" max="10" value="0" step="1" onchange="updateTextInput2(this.value);" style="width:50%;">
					<input type="text" class="form-control" id="slideval2" value="" style="width:50px;">
					
				</td>
			</tr>
		</table>
		<table class="table table-bordered">
			<tr>
				<td colspan="5" class="success">If 10 is the worst pain imaginable and 0 is no pain at all, please note your pain over the last <b>TWO WEEKS</b></td>
			</tr>
			<tr class="info">
				<td width="15%"></td>
				<td class="text-center">NO CHANGE</td>
				<Td class="text-center">RELIEVES PAIN</td>
				<td class="text-center">INCRESES PAIN</td>
				<td class="text-center">AFTER HOW LONG?</td>
			</tr>
			<tr>
				<td>Sitting</td>
				<td><input type="text" class="form-control" placeholder="Sitting"></td>
				<td><input type="text" class="form-control" placeholder="Sitting "></td>
				<td><input type="text" class="form-control" placeholder="Sitting "></td>
				<td><input type="text" class="form-control" placeholder="sitting"></td>
			</tr>
			<tr>
				<td>Walking</td>
				<td><input type="text" class="form-control" placeholder="Walking"></td>
				<td><input type="text" class="form-control" placeholder="Walking "></td>
				<td><input type="text" class="form-control" placeholder="Walking "></td>
				<td><input type="text" class="form-control" placeholder="Walking"></td>
			</tr>
			<tr>
				<td>Standing</td>
				<td><input type="text" class="form-control" placeholder="Standing"></td>
				<td><input type="text" class="form-control" placeholder="Standing "></td>
				<td><input type="text" class="form-control" placeholder="Standing "></td>
				<td><input type="text" class="form-control" placeholder="Standing"></td>
			</tr>
			<tr>
				<td>Standing</td>
				<td><input type="text" class="form-control" placeholder="Standing"></td>
				<td><input type="text" class="form-control" placeholder="Standing "></td>
				<td><input type="text" class="form-control" placeholder="Standing "></td>
				<td><input type="text" class="form-control" placeholder="Standing"></td>
			</tr>
			<tr>
				<td>Lying Down</td>
				<td><input type="text" class="form-control" placeholder="Lying Down"></td>
				<td><input type="text" class="form-control" placeholder="Lying Down "></td>
				<td><input type="text" class="form-control" placeholder="Lying Down "></td>
				<td><input type="text" class="form-control" placeholder="Lying Down"></td>
			</tr>
			<tr>
				<td>Bending Forward</td>
				<td><input type="text" class="form-control" placeholder="Bending Forward"></td>
				<td><input type="text" class="form-control" placeholder="Bending Forward "></td>
				<td><input type="text" class="form-control" placeholder="Bending Forward "></td>
				<td><input type="text" class="form-control" placeholder="Bending Forward"></td>
			</tr>
			<tr>
				<td>Bending Backward</td>
				<td><input type="text" class="form-control"  placeholder="Bending Backward"></td>
				<td><input type="text" class="form-control" placeholder="Bending Backward"></td>
				<td><input type="text" class="form-control"  placeholder="Bending Backward"></td>
				<td><input type="text" class="form-control" placeholder="Bending Backward"></td>
			</tr>
			<tr>
				<td>Lifting</td>
				<td><input type="text" class="form-control" placeholder="Lifting"></td>
				<td><input type="text" class="form-control" placeholder="Lifting"></td>
				<td><input type="text" class="form-control" placeholder="Lifting"></td>
				<td><input type="text" class="form-control"  placeholder="Lifting"></td>
			</tr>
			<tr>
				<td>Coughing/Sneezing</td>
				<td><input type="text" class="form-control" placeholder="Coughing/Sneezing"></td>
				<td><input type="text" class="form-control" placeholder="Coughing/Sneezing"></td>
				<td><input type="text" class="form-control" placeholder="Coughing/Sneezing"></td>
				<td><input type="text" class="form-control" placeholder="Coughing/Sneezing"></td>
			</tr>
			<tr>
				<td>Changing/Position</td>
				<td><input type="text" class="form-control" placeholder="Changing/Position"></td>
				<td><input type="text" class="form-control" placeholder="Changing/Position"></td>
				<td><input type="text" class="form-control" placeholder="Changing/Position"></td>
				<td><input type="text" class="form-control" placeholder="Changing/Position"></td>
			</tr>
			<tr>
				<td colspan="2">Which other activities, motions, or positions affect your symptoms?</td>
				<td colspan="3"><textarea class="form-control" placeholder="activities, motions, or positions affect your symptoms"></textarea></td>
			</tr>
			<tr>
				<td colspan="2">What do you do to relieve your pain?</td>
				<td colspan="3"><textarea class="form-control" placeholder="What you always do to remove the pain."></textarea></td>
			</tr>
			<tr>
				<td colspan="5" class="success"><b>Check all those that apply to you:</b></td>
			</tr>
			<tr>
				<td>Bladder Function</td>
				<td colspan="4">
					Normal <input type="radio" id="BladderFunction1" checked>
					Loss of control or accidents <input type="radio" value="Loss of control or accidents">
					Difficulty starting urination <input type="radio" value="Difficulty starting urination">
					Sense of urgency <input type="radio" value="Sense of urgency">
				</td>
			<tr>
				<td>Bowel Function</td>
				<td colspan="4">
					Normal <input type="radio" value="Normal" checked>
					Loss of control or accidents <input type="radio" value="Loss of control or accidents">
				</td>
			</tr>
			<tr>
				<td>Problems with sexual funtion?</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
				</td>
			</tr>
			<tr>
				<td>Loss of sensation around the groin, genitals or buttocks?</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
				</td>
			</tr>
			<tr>
				<td>Weakness of a leg/foot?</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
					(	Right <input type="radio" value="Y">
						Left <input type="radio" value="Y">	)
				</td>
			</tr>
			<tr>
				<td>Weakness of a arm/hand?</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
					(	Right <input type="radio" value="Y">
						Left <input type="radio" value="Y">	)
				</td>
			</tr>
			<tr>
				<td>Does your pain hurt only at night or awaken you at night</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
				</td>
			</tr>
			<tr>
				<td>Does you pain interfere with your sleep?</td>
				<td colspan="4">
					No <input type="radio" value="N" checked>
					Yes <input type="radio" value="Y">
				</td>
			</tr>
		</table>							
	</div>
	<script src="dist/js/jquery-1.7.2.min.js"></script>
    <script src="dist/js/bootstrap.min.js"></script>
	<script src="MyFunc/slider.js"></script>
</body>
</html>