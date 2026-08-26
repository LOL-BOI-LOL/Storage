import java.util.HashMap;

public class Key {
  public static String[] options = {"Latin Vocab 1", "Latin Vocab 2", "Latin 3rd i-stem Declension", "Latin 4th Declension", "Latin 5th Declension", "Irregular Verbs", "Comparative", "Prepositions", "Warren Court Cases"};
  private HashMap<String, String> key = new HashMap<String, String>();
  public Key(String option) {
    if (option.equals("Latin Vocab 1")) {
      key.put("help, aid", "auxilium, auxili - n");
      key.put("plan, advice", "consilium, consili - n");
      key.put("money", "pecunia, pecuniae - f");
      key.put("danger", "periculum, periculi - n");
      key.put("city", "urbs, urbis - f");
      key.put("eternal, everlasting", "aeternus, aeterna, aeternum");
      key.put("constant", "perpetuus, perpetua, perpetuum");
      key.put("hear", "audio, audire, audivi, auditus");
      key.put("come together", "convenio, convenire, conveni, conventurus");
      key.put("push, drive", "pello, pellere, pepuli, pulsus");
      key.put("rule, guide", "rego, regere, rexi, rectus");
      key.put("ask", "rogo, rogare, rogavi, rogatus");
    } else if (option.equals("Latin Vocab 2")) {
      key.put("hand", "manus, manus - f");
      key.put("fear", "metus, metus - m");
      key.put("horn", "cornu, cornus - n");
      key.put("face, expression", "vultus, vultus - m");
      key.put("spirit", "spiritus, spiritus - m");
      key.put("verse", "versus, versus - m");
      key.put("fruit", "fructus, fructus - m");
      key.put("senate", "senatus, senatus - m");
      key.put("ice", "glacies, glaciei - f");
      key.put("pledge, trust, faith", "fides, fidei - f");
      key.put("hope", "spes, spei - f");
      key.put("day", "dies, diei - m & f");
    } else if(option.equals("Latin 3rd i-stem Declension")) {
      key.put("Nominative m&f", "-, es");
      key.put("Genative m&f", "is, ium");
      key.put("Dative m&f", "i, ibus");
      key.put("Accusative m&f", "em, es");
      key.put("Ablative m&f", "e, ibus");
      key.put("Nominative n", "-, ia");
      key.put("Genative n", "is, ium");
      key.put("Dative n", "i, ibus");
      key.put("Accusative n", "-, ia");
      key.put("Ablative n", "i, ibus");
    } else if (option.equals("Latin 4th Declension")) {
      key.put("Nominative", "us, us");
      key.put("Genitive", "us, uum");
      key.put("Dative", "ui, ibus");
      key.put("Accusative", "um, us");
      key.put("Ablative", "u, ibus");
      key.put("Nominative n", "u, ua");
      key.put("Genitive n", "us, um");
      key.put("Dative n", "u, ibus");
      key.put("Accusative n", "u, ua");
      key.put("Ablative n", "u, ibus");
    } else if (option.equals("Latin 5th Declension")) {
      key.put("Nominative", "es, es");
      key.put("Genitive", "ei, erum");
      key.put("Dative", "ei, ebus");
      key.put("Accusative", "em, es");
      key.put("Ablative", "e, ebus");
    } else if (option.equals("Irregular Verbs")) {
      key.put("Present To Be", "sum, es, est, sumus, estis, sunt");
      key.put("Imperfect To Be", "eram, eras, erat, eramus, eratis, erant");
      key.put("Future To Be", "ero, eris/ere, erit, erimus, eritis, erunt");
      key.put("Perfect To Be", "fui, fuisti, fuit, fuimus, fuistis, fuerunt/fuere");
      key.put("Pluperfect To Be", "fueram, fueras, fuerat, fueramus, fueratis, fuerant");
      key.put("Present To Be Able", "possum, potes, potest, possumus, potestis, possunt");
      key.put("Imperfect To Be Able", "poteram, poteras, poterat, poteramus, poteratis, poterant");
      key.put("Future To Be Able", "potero, poteris/potere, poterit, poterimus, poteritis, poterunt");
      key.put("Perfect To Be Able", "potui, potuisti, potuit, potuimus, potuistis, potuerunt/potuere");
      key.put("Pluperfect To Be Able", "potueram, potueras, potuerat, potueramus, potueratis, potuerant");
    } else if (option.equals("Comparative")) {
      key.put("Nominative m&f", "ior, iores");
      key.put("Genative m&f", "ioris, iorum");
      key.put("Dative m&f", "iori, ioribus");
      key.put("Accusative m&f", "iorem, iores");
      key.put("Ablative m&f", "iore, ioribus");
      key.put("Nominative n", "ius, iora");
      key.put("Genative n", "ioris, iorum");
      key.put("Dative n", "iori, ioribus");
      key.put("Accusative n", "ius, iora");
      key.put("Ablative n", "iora, ioribus");
    } else if (option.equals("Prepositions")) {
      key.put("ad", "to, towards, at");
      key.put("ante", "before");
      key.put("circum", "around");
      key.put("extra", "outside");
      key.put("in abl", "in, on");
      key.put("in acc", "into, onto");
      key.put("inter", "among");
      key.put("per", "through");
      key.put("post", "after, behind");
      key.put("prope", "near");
      key.put("trans", "across");
      key.put("a, ab", "from");
      key.put("cum", "with");
      key.put("de", "down from, about");
      key.put("e, ex", "out of");
      key.put("sine", "without");
      key.put("sub", "under");
    } else if (option.equals("Warren Court Cases")) {
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Court decided that the Un-American Activities Committee’s decision was invalid due to the Due Process Clause of the Fifth Amendment, as they did not provide sufficient information for Watkins to decide if it was within his rights to deny answering the questions.",
        "Watkins v. U.S. (1957)"
      );
      key.put(
        "The Court stated that in the Smith Act the word “organize” was used to describe the creation of an organization and that there was a difference between advocating forceful overthrow of the government as abstract principles versus concrete action.",
        "Yates v. U.S. (1957)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
      key.put(
        "The Supreme Court decided that segregating education based on race was inherently unequal due to its psychological impacts on children, and that it violated the Fourteenth Amendment.",
        "Brown v. Board of Education of Topeka (1954)"
      );
    } else System.out.println("Invalid Key");
  }
  public String[] getRandom() {
    int rand = (int) Math.floor(Math.random() * (double) key.size());
    String q = key.keySet().toArray(new String[key.size()])[rand];
    String a = key.get(q);
    key.remove(q);
    return new String[] {q, a};
  }
  public int size() { return key.size(); }
}